import { comparePassword } from "../../utils/passwordHandler.js";
import prisma from "../../config/prisma.js";
import { ValidationError } from "../../utils/validationError.js";
import { TokenService } from "./token.service.js";

export const loginUser = async (identifier, password, ip, userAgent) => {
    // identifier can be either username or email
    if(!identifier || !password) {
        throw new ValidationError("Missing credentials", 400);
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isNis = /^\d+$/.test(identifier);

    const user = await prisma.user.findFirst({
        where: isEmail 
        ? { email: identifier } 
        : isNis 
        ? { nis: identifier } 
        : { name: identifier }
    });

    if (!user) {
        throw new ValidationError("User not found", 404).addError("Invalid email/nis or password incorrect");
    }

    const passwordMatch = await comparePassword(password, user.passwordHash);
    if (!passwordMatch) {
        throw new ValidationError("Authentication failed", 401).addError("Invalid email/nis or password incorrect");
    }

    // Generate tokens - this was missing fam!
    const tokenPayload = {
        id: user.id,
        email: user.email,
        nis: user.nis,
        role: user.role,
        ip: ip,
        userAgent: userAgent
    };

    const { accessToken, refreshToken, familyId } = await TokenService.generateTokens(tokenPayload);
    // console.log("Generated tokens:", { accessToken, refreshToken });

    // Return user info + tokens
    return {
        user: {
            id: user.id,
            email: user.email,
            nis: user.nis,
            name: user.name,
            role: user.role
        },
        accessToken,
        refreshToken,
        familyId
    };
}