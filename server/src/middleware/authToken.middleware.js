import { TokenService } from "../services/auth/token.service.js";
import { response } from "../utils/response.js";
import { redisClient } from "../config/redis.js";

const redis = redisClient(1);

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return response(res, 401, "Missing authorization header", null, ["No token provided"]);
        }

        const token = authHeader.split(" ")[1];
        const result = await TokenService.verifyAccessToken(token);
        
        if (!result.valid) {
            // Kalo token expired/invalid, frontend harus manual refresh
            return response(
                res, 
                401, 
                "Access token invalid", 
                { 
                    nextAction: result.error === "TokenExpired" ? "REFRESH" : "LOGIN",
                    links: { 
                      "refresh": "POST /auth/token/refresh",
                      "login": "POST /auth/login"
                    }
                },
                [result.error]
            );
        }

        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
          return response(res, 401, "No refresh token", { nextAction: "LOGIN" }, ["Missing refresh token"]);
        } else {
          const decodedRefresh = TokenService.decodeToken(refreshToken);
          if ((decodedRefresh && decodedRefresh.family) && (decodedRefresh.family !== result.payload.family)) {
            const mismatchCount = await redis.incr(`security:family_mismatch:${result.payload.id}:${decodedRefresh.family}`);
            await redis.expire(
                            `security:family_mismatch:${decodedRefresh.id}:${decodedRefresh.family}`,
                            300  // 5 menit window
                        );
            if (mismatchCount >= 3) {
              console.warn(`Potential token theft detected for user ${result.payload.id}. Family ID mismatch count: ${mismatchCount}`);
              await TokenService.revokeTokenFamily(result.payload.id, decodedRefresh.family);
              await TokenService.revokeTokenFamily(result.payload.id, result.payload.family);
              return response(
                res, 
                401, 
                "Security alert: Multiple token mismatches detected. All sessions from this device have been logged out.", 
                { 
                  nextAction: "LOGIN",
                  links: { 
                    "login": "POST /auth/login"
                  }
                }, 
                ["Token family mismatch - family revoked"]
              );
            }
          }
        }

        req.user = result.payload;
        next();
        
    } catch (err) {
        console.error("Auth middleware error:", err);
        return response(res, 500, "Authentication error", null, [err.message]);
    }
};