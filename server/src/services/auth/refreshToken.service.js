import { TokenService } from "./token.service.js";
import { ValidationError } from "../../utils/validationError.js";

export const refreshToken = async (oldRefreshToken) => {
    
    const result = await TokenService.verifyRefreshToken(oldRefreshToken);
    
    if (result.error === "TokenReuseDetected") {
        
        await TokenService.revokeTokenFamily(result.userId, result.family);

        throw new ValidationError("Security alert: Token reuse detected. All sessions from this device have been logged out.", 401).addError(
            "Token reuse - family revoked"
        ).addPayload(
            { nextAction: "LOGIN" }
        );
    }
    
    if (!result.valid) {
        throw new ValidationError("Refresh token invalid", 401).addError(
            "Invalid or expired refresh token"
        ).addPayload(
            { nextAction: "LOGIN" }
        );
    }

    const oldPayload = result.payload;
    
    await TokenService.revokeRefreshToken(
        oldPayload.id, 
        oldPayload.family, 
        oldPayload.jti
    );
    
    const { accessToken, refreshToken: newRefreshToken } = await TokenService.generateTokens(
        {
            id: oldPayload.id,
            email: oldPayload.email,
            role: oldPayload.role,
        },
        oldPayload.family  
    );

    return { accessToken, newRefreshToken };
}