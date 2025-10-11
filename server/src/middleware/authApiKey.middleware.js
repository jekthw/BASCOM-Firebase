import prisma from "../config/prisma.js";
import crypto from "crypto";
import { response } from "../utils/response.js";

/**
 * Middleware untuk verifikasi API Key
 * Expects API key in header: 'x-api-key'
 */
export const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return response(res, 401, "API key is required", [], ["Missing 'x-api-key' header"]);
    }

    // Hash dulu API key dari header biar bisa dicocokkan dengan DB
    const apiKeyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

    // Cari API key di database
    const keyData = await prisma.aPIKey.findFirst({
    where: {
        keyHash: apiKeyHash,
        isActive: true,
        AND: [
        {
            OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
            ],
        },
        ],
    },
    });


    if (!keyData) {
      return response(res, 403, "Invalid or expired API key", [], ["The provided API key is either invalid or has expired."]);
    }

    // Update last used timestamp
    await prisma.aPIKey.update({
      where: { id: keyData.id },
      data: { lastUsed: new Date() },
    });

    // Tambahin info API key ke request biar bisa dipake di controller
    req.apiKey = keyData;
    next();
  } catch (error) {
    console.error("API Key verification error:", error);
    return response(res, 500, "Internal Server Error", [], [error.message]);
  }
};
