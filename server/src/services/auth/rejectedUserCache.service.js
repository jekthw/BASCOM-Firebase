import { redisClient } from "../../config/redis.js";

// Buat client instance dulu
const client = redisClient(0);

export const storeRejectedOrNotFoundUser = async (userData, verificationResult) => {
  const key = `rejected_or_not_found_user:${userData.nis}`;
  const dataToStore = {
    nis: userData.nis,
    name: userData.name,
    email: userData.email,
    motherName: userData.motherName,
    gender: userData.gender,
    birthDate: userData.birthDate,
    rejectionReason: verificationResult.reason,
    rejectionStatus: verificationResult.status,
    timestamp: new Date().toISOString()
  };
  
  await client.set(key, JSON.stringify(dataToStore));
  await client.expire(key, 60 * 60 * 24);
  
  return key;
};

export const getRejectedOrNotFoundUser = async (nis) => {
  const key = `rejected_or_not_found_user:${nis}`;
  
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

export const deleteRejectedOrNotFoundUser = async (nis) => {
  const exists = await isUserRejectedOrNotFound(nis); // Optional: Cek dulu apakah ada
  if (!exists) return false; // Kalau ga ada, ga usah dihapus
  const key = `rejected_or_not_found_user:${nis}`;
  await client.del(key);
  return true;
};

export const isUserRejectedOrNotFound = async (nis) => {
  const key = `rejected_or_not_found_user:${nis}`;
  const exists = await client.exists(key);
  return exists === 1;
};

export const getRemainingTTL = async (nis) => {
  const key = `rejected_or_not_found_user:${nis}`;
  const ttl = await client.ttl(key);
  return ttl > 0 ? ttl : 0; // return 0 kalau expired atau ga ada
};
