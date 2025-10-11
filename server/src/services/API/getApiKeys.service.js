import prisma from "../../config/prisma.js";

const baseSelect = {
  id: true,
  name: true,
  description: true,
  isActive: true,
  lastUsed: true,
  createdAt: true,
  expiresAt: true,
};

export const getAllApiKeys = async () => {
  return prisma.aPIKey.findMany({
    select: baseSelect,
    orderBy: { createdAt: "desc" }, // biar urut terbaru dulu
  });
};

export const getActiveApiKeys = async () => {
  return prisma.aPIKey.findMany({
    where: { isActive: true },
    select: baseSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const getDeactiveApiKeys = async () => {
  return prisma.aPIKey.findMany({
    where: { isActive: false },
    select: baseSelect,
    orderBy: { createdAt: "desc" },
  });
};
