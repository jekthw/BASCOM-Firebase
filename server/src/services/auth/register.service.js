import { verifyUserIdentity } from "./identityVerification.service.js";
import { validateRegisterInput } from "./inputValidation.service.js";
import { checkExistingUser } from "./checkUserExistence.service.js";
import { createUser } from "./createUser.service.js";
import { storeRejectedOrNotFoundUser } from "./rejectedUserCache.service.js";
import { authLogger, systemLogger } from "../../utils/logger.js";

export const registerUser = async (req) => {
    const { name, password, email, nis, motherName } = req.body;
    const clientIP = req.ip || req.connection?.remoteAddress || 'unknown';

    authLogger.registrationAttempt(nis, 'started', null, {
            email,
            ip: clientIP,
            userAgent: req.headers?.['user-agent'] || 'unknown'
        });

    const birthDateObj = validateRegisterInput(req.body);
    await checkExistingUser(nis);
    
    // ===== Verify identity =====
    const verificationResult = await verifyUserIdentity(nis, motherName, birthDateObj);

    authLogger.verificationAttempt(nis, motherName, verificationResult.status, {
        similarity: verificationResult.similarity
    });

    const userData = {
        nis,
        name,
        password,
        email,
        motherName,
        gender: verificationResult.verificationRecord ? verificationResult.verificationRecord.gender : null,
        birthDate: birthDateObj,
    };

    if (verificationResult.status === "PENDING") {
        await createUser(userData, "WAITING_FOR_ADMIN_VERIFICATION");

        authLogger.registrationSuccess(nis, "WAITING_FOR_ADMIN_VERIFICATION", {
            reason: verificationResult.reason,
            ip: clientIP
        });
        
        return {
            payload: {
                nextAction: "WAIT_FOR_ADMIN_VERIFICATION",
                userRegistationStatus: "WAITING_FOR_ADMIN_VERIFICATION",
                reason: verificationResult.reason
            },
            statusCode: 202,
            message: `Your data is found but ${verificationResult.reason}. Please wait for admin verification.`,
        };

    } else if (verificationResult.status === "REJECTED") {
        await storeRejectedOrNotFoundUser(userData, verificationResult);

        authLogger.registrationFailed(nis, verificationResult.reason, {
            status: verificationResult.status,
            ip: clientIP,
            storedInCache: true
        });

        return {
            payload: {
                nextAction: "MANUAL_VERIFICATION",
                userRegistationStatus: "REJECTED",
                reason: verificationResult.reason,
                nis: nis
            },
            statusCode: 409,
            message: `Verification failed, please continue with manual verification`,
        };

    } else if (verificationResult.status === "NOT_FOUND") {
        await storeRejectedOrNotFoundUser(userData, verificationResult);

        authLogger.registrationFailed(nis, verificationResult.reason, {
            status: verificationResult.status,
            ip: clientIP,
            storedInCache: true
        });

        return {
            payload: {
                nextAction: "MANUAL_VERIFICATION",
                userRegistationStatus: "NOT_FOUND",
                reason: verificationResult.reason,
                nis: nis
            },
            statusCode: 404,
            message: `Your data is not in our records. You can continue with manual verification.`,
        };

    } else if (verificationResult.status === "APPROVED") {
        await createUser(userData, "APPROVED");

        authLogger.registrationSuccess(nis, "APPROVED", {
            ip: clientIP,
            autoApproved: true
        });

        return {
            payload: {
                nextAction: "LOGIN",
                userRegistationStatus: "APPROVED",
                links: { login: "/auth/login" }
            },
            statusCode: 201,
            message: "User registered successfully",
        };

    } else {
        throw new Error("Internal Error: Unknown verification status");
    }
};