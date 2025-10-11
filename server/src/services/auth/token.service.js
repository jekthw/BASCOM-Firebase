import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.js";
import { redisClient } from "../../config/redis.js";
import { randomUUID } from "crypto";

const redis = redisClient(1);

export const TokenService = {
    async generateTokens(payload, familyId = null) {
        // Clean payload
        const cleanPayload = { ...payload };
        delete cleanPayload.exp;
        delete cleanPayload.iat;
        delete cleanPayload.jti;
        delete cleanPayload.family;
        
        // Generate family ID kalo belum ada (first login)
        const tokenFamily = familyId || randomUUID();  // 👈 Family ID
        
        // Generate unique IDs for tokens
        const accessJti = randomUUID();
        const refreshJti = randomUUID();
        
        // Add family to payload
        const accessPayload = { ...cleanPayload, family: tokenFamily };  // 👈
        const refreshPayload = { ...cleanPayload, family: tokenFamily };  // 👈
        
        // Sign tokens
        const accessToken = jwt.sign(
            accessPayload, 
            jwtConfig.accessSecret, 
            {
                expiresIn: jwtConfig.accessExpiresIn,
                jwtid: accessJti
            }
        );
        
        const refreshToken = jwt.sign(
            refreshPayload, 
            jwtConfig.refreshSecret, 
            {
                expiresIn: jwtConfig.refreshExpiresIn,
                jwtid: refreshJti
            }
        );
        
        // Store di Redis dengan family ID di structure
        await redis.multi()
            .setex(
                `user:${payload.id}:${tokenFamily}:access:${accessJti}`,  // 👈 Family di key
                jwtConfig.accessExpiresIn, 
                JSON.stringify({
                    hits: 0,  
                    createdAt: Date.now()
                }) 
            )
            .setex(
                `user:${payload.id}:${tokenFamily}:refresh:${refreshJti}`,  // 👈 Family di key
                jwtConfig.refreshExpiresIn, 
                JSON.stringify({  // 👈 Simpen metadata di refresh token
                    ip: payload.ip || null,
                    userAgent: payload.userAgent || null,
                    createdAt: Date.now()
                })
            )
            .exec();
            
        return { accessToken, refreshToken, familyId: tokenFamily };
    },

    async verifyAccessToken(token) {
        try {
            const payload = jwt.verify(token, jwtConfig.accessSecret);

            const key = `user:${payload.id}:${payload.family}:access:${payload.jti}`;
            const data = await redis.get(key);

            if (!data) {
            return { valid: false, error: "TokenRevoked" };
            }

            // ✅ update hits tanpa ngilangin TTL
            try {
            const parsed = JSON.parse(data);
            parsed.hits = (parsed.hits || 0) + 1;
            parsed.lastUsedAt = Date.now();

            await redis.set(key, JSON.stringify(parsed), "KEEPTTL");
            } catch (err) {
            console.warn(`Failed to update token hits for ${key}:`, err);
            }

            return { valid: true, payload };
            
        } catch (err) {
            return {
            valid: false,
            error: err.name === "TokenExpiredError"
                ? "TokenExpired"
                : "InvalidAccessToken",
            };
        }
    },


    async verifyRefreshToken(token) {
        try {
            const payload = jwt.verify(token, jwtConfig.refreshSecret);
            
            // Cek di Redis
            const data = await redis.get(
                `user:${payload.id}:${payload.family}:refresh:${payload.jti}`  // 👈 Include family
            );
            
            if (!data) {
                // 🚨 TOKEN REUSE DETECTED!
                return { 
                    valid: false, 
                    error: "TokenReuseDetected",
                    family: payload.family,  // 👈 Return family buat di-revoke
                    userId: payload.id
                };
            }
            
            return { valid: true, payload };
            
        } catch (err) {
            return {
                valid: false,
                error: err.name === "TokenExpiredError" ? "TokenExpired" : "InvalidRefreshToken",
            };
        }
    },

    async revokeRefreshToken(userId, familyId, jti) {
        // Hapus refresh token lama
        await redis.del(`user:${userId}:${familyId}:refresh:${jti}`);
    },

    async revokeTokenFamily(userId, familyId) {
        // 💀 NUKE seluruh family (semua token dari sesi login ini)
        const keys = await redis.keys(`user:${userId}:${familyId}:*`);
        if (keys.length > 0) {
            await redis.del(...keys);
        }
        console.log(`🚨 Revoked token family ${familyId} for user ${userId}`);
    },

    async revokeAllUserTokens(userId) {
        // Revoke SEMUA token user (semua family, semua device)
        const keys = await redis.keys(`user:${userId}:*`);
        if (keys.length > 0) {
            await redis.del(...keys);
        }
    },

    async getUserActiveSessions(userId) {
        // Get semua family/device yang aktif
        const keys = await redis.keys(`user:${userId}:*:refresh:*`);
        
        const sessions = [];
        for (const key of keys) {
            const data = await redis.get(key);
            if (data) {
                const parsed = JSON.parse(data);
                // Extract family ID dari key: user:123:family-abc:refresh:jti-xyz
                const familyId = key.split(':')[2];
                sessions.push({
                    familyId,
                    ...parsed
                });
            }
        }
        
        return sessions;
    },

    decodeToken(token) {
        try {
            return jwt.decode(token);
        } catch {
            return null;
        }
    },
};