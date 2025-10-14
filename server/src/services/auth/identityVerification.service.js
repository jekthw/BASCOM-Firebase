import prisma from "../../config/prisma.js";
import { ValidationError } from "../../utils/validationError.js";
import { findSimilarName } from "./nameMatcher.service.js";


export const verifyUserIdentity = async (nis, motherName, birthDate) => {
    const errors = new ValidationError();
    const verificationRecord = await prisma.verificatorData.findUnique({
        where: { nis }
    });

    if (!verificationRecord) {
        return {status: "NOT_FOUND", reason: "Your NIS was not found in our records"};
    }

    const motherCheck = findSimilarName(verificationRecord.motherName, motherName);
    console.log("Mother name check:", motherCheck);

    if (motherCheck.status === "VERIFIED" && birthDate.getTime() === verificationRecord.birthDate.getTime())
        return {status: "APPROVED", verificationRecord};
    else if (motherCheck.status === "VERIFIED" && birthDate.getTime() !== verificationRecord.birthDate.getTime())
        return {status: "PENDING", reason: "Birth date does not match", verificationRecord};
    else if (motherCheck.status === "PENDING" && birthDate.getTime() === verificationRecord.birthDate.getTime())
        return {status: "PENDING", reason: "Mother's name is similar but not exact", verificationRecord};
    else if (motherCheck.status === "REJECTED" && birthDate.getTime() !== verificationRecord.birthDate.getTime())
        return {status: "REJECTED", reason: "Mother's name does not match, and birth date does not match", verificationRecord
    };

}