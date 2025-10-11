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

    return newUser;
};