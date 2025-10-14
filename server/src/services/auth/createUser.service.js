import prisma from "../../config/prisma.js";
import { hashPassword } from "../../utils/passwordHandler.js";
import { getAngkatanFromNis } from "./nisHelper.service.js";

export const createUser = async (userData, verificationStatus) => {
    const { nis, email, password, motherName, birthDate, name, gender } = userData;
    
    const hashedPassword = await hashPassword(password);
    const angkatan = getAngkatanFromNis(nis);

    const newUser = await prisma.user.create({
        data: {
            nis,
            email,
            passwordHash: hashedPassword,
            name,
            angkatan,
            gender,
            verificationStatus,
            verificationData: {
                motherName,
                birthDate,
            },
        },
    });

    await prisma.verificationRequest.create({
        data: {
            userId: newUser.id,
            docType: null,
            fileUrl: null,
            status: "APPROVED",
            reviewedBy: 0, // system
            reviewedAt: new Date(),
        },
    });

    return newUser;
};