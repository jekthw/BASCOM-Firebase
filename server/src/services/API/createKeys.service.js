import prisma from "../../config/prisma.js";
import { generateApiKey, hashApiKey } from "../../utils/passwordHandler.js";
import { ValidationError } from "../../utils/validationError.js";

export const createApiKey = async ({ name, description, expiresAt }) => {
  const apiKey = generateApiKey();
  const keyHash = await hashApiKey(apiKey);

  const checkExisting = await prisma.aPIKey.findFirst({
    where: { name },
  });

  if (checkExisting) {
    throw new ValidationError("Please choose a different name for the API Key")
      .addError("API Key name already exists");
  }

  const newKey = await prisma.aPIKey.create({
    data: {
      keyHash,
      name,
      description,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  return { apiKey, newKey };
};