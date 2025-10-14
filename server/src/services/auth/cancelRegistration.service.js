import prisma from "../../config/prisma.js";
import { ValidationError } from "../../utils/validationError.js";
import { deleteRejectedOrNotFoundUser } from "./rejectedUserCache.service.js";

export const cancelRegistration = async (req) => {
    const { nis } = req.params;

    if (!nis) {
        throw new ValidationError("NIS is required", 400)
        .addError("NIS parameter is missing");
    }
    
    const deletedUsers = await prisma.user.deleteMany({
        where: { nis },
    });

    if (deletedUsers.count === 0) {
        throw new ValidationError("User not found", 404)
        .addError("No user found with the provided NIS");
    }

    const deletedCache = await deleteRejectedOrNotFoundUser(nis);

    if (!deletedCache) {
        throw new ValidationError("User not found", 500)
            .addError("No cache entry found for the provided NIS");
    }

    return {
        message: "Registration cancelled successfully",
        statusCode: 200,
        payload: {
            nis: nis,
            deletedUsers: deletedUsers.count,
            nextAction: "RETRY_REGISTRATION",
            links: {
                retryRegistration: "POST /auth/register"
            }
        }
    };
};
