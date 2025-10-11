import prisma from "../../config/prisma.js";
import { hashApiKey } from "../../utils/passwordHandler.js";

export const deactivateApiKey = async (apiKey) => {
  const keyHash = await hashApiKey(apiKey);
  return prisma.aPIKey.update({
    where: { keyHash },
    data: { isActive: false },
  });
};