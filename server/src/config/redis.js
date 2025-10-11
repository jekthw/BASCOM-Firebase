import Redis from "ioredis";

const baseConfig = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};

// Factory function → bikin client baru sesuai DB
export const redisClient = (db = 0) => {
  const client = new Redis({
    ...baseConfig,
    db,
  });

  client.on("connect", () => {
    console.log(`✅ Redis connected (db=${db})`);
  });

  client.on("error", (err) => {
    console.error(`❌ Redis error (db=${db}):`, err);
  });

  return client;
};
