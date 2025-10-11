import { redisClient } from "../../config/redis.config.js";

const redis = redisClient(1);

export const logoutUser = async (userId) => {
  // Invalidate user tokens
  await redis.del(`access_token:${userId}`);
  await redis.del(`refresh_token:${userId}`);
};
