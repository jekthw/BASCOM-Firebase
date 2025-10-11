// services/userExistence.service.js
import prisma from "../../config/prisma.js";
import { ValidationError } from "../../utils/validationError.js";
import { isUserRejectedOrNotFound, getRemainingTTL } from "./rejectedUserCache.service.js";

export const checkExistingUser = async (nis) => {
    if (!nis) return;

    // Check Redis cache dulu
    const isInCache = await isUserRejectedOrNotFound(nis);
    if (isInCache) {
        const remainingTime = await getRemainingTTL(nis);
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        
        const errors = new ValidationError();
        errors.addError(`You recently attempted registration. Please continue with manual verification or wait ${hours}h ${minutes}m before trying again.`);
        errors.message = "Registration in progress";
        errors.statusCode = 409;
        throw errors;
    }

    const existingUser = await prisma.user.findFirst({
        where: { nis }
    });

    const test = await prisma.user.findUnique({
        where: { nis },
        include: { verificatorData: true }
    });
    console.log("Test user fetch:", test);

    if (!existingUser) return;

    const errors = new ValidationError();
    switch (existingUser.verificationStatus) {
        case "APPROVED":
            errors.addError("User with this NIS already exists, please login");
            errors.message = "User already exists";
            errors.statusCode = 409;
        break;
        case "WAITING_FOR_ADMIN_VERIFICATION":
            errors.addError("Please wait your account is being verified");
            errors.message = "Your account is being verified";
            errors.statusCode = 409;
        break;
        case "UPLOAD_DOCUMENT":
            errors.addError("User with this NIS exists but needs to upload documents");
            errors.message = "Please complete your registration by uploading required documents";
            errors.statusCode = 409;
        break;
        case "REJECTED":
            errors.addError("User with this NIS was rejected previously. Please contact administrator.");
            errors.message = "User registration was rejected previously";
            errors.statusCode = 403;
        break;
    }

    if (errors.hasErrors()) throw errors;
};