import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";

const logDir = "logs";

/* =========================
   FORMAT DEFINITIONS
========================= */
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(
    ({ timestamp, level, message, service, action, userId, nis, ip, ...meta }) => {
      let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      if (service) logMessage += ` | Service: ${service}`;
      if (action) logMessage += ` | Action: ${action}`;
      if (userId) logMessage += ` | UserID: ${userId}`;
      if (nis) logMessage += ` | NIS: ${nis}`;
      if (ip) logMessage += ` | IP: ${ip}`;
      if (Object.keys(meta).length > 0) {
        logMessage += ` | Meta: ${JSON.stringify(meta)}`;
      }
      return logMessage;
    }
  )
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, service, action }) => {
    return `[${timestamp}] ${level}: ${message} ${service ? `(${service}/${action})` : ""}`;
  })
);

/* =========================
   LOGGER INSTANCE
========================= */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: fileFormat,
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "14d",
      maxSize: "20m",
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, "auth-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "info",
      maxFiles: "30d",
      maxSize: "20m",
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      maxSize: "50m",
    }),
  ],
});

// Console transport hanya untuk dev
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

/* =========================
   HELPER LOGGERS
========================= */
export const authLogger = {
  registrationAttempt: (nis, status, reason = null, metadata = {}) =>
    logger.info("User registration attempt", {
      service: "auth",
      action: "registration_attempt",
      nis,
      status,
      reason,
      ...metadata,
    }),

  registrationSuccess: (nis, verificationStatus, metadata = {}) =>
    logger.info("User registered successfully", {
      service: "auth",
      action: "registration_success",
      nis,
      verificationStatus,
      ...metadata,
    }),

  registrationFailed: (nis, reason, metadata = {}) =>
    logger.warn("User registration failed", {
      service: "auth",
      action: "registration_failed",
      nis,
      reason,
      ...metadata,
    }),

  cacheHit: (nis, action) =>
    logger.debug("Redis cache hit", {
      service: "cache",
      action,
      nis,
    }),

  verificationAttempt: (nis, motherName, result, metadata = {}) =>
    logger.info("Identity verification attempt", {
      service: "verification",
      action: "identity_check",
      nis,
      motherName: motherName?.substring(0, 3) + "***", // mask nama ibu
      result,
      ...metadata,
    }),
};

export const systemLogger = {
  dbError: (operation, error, metadata = {}) =>
    logger.error("Database operation failed", {
      service: "database",
      action: operation,
      error: error.message,
      stack: error.stack,
      ...metadata,
    }),

  redisError: (operation, error, metadata = {}) =>
    logger.error("Redis operation failed", {
      service: "redis",
      action: operation,
      error: error.message,
      ...metadata,
    }),

  apiKeyUsage: (keyName, endpoint, ip) =>
    logger.info("API Key used", {
      service: "api",
      action: "key_usage",
      keyName,
      endpoint,
      ip,
    }),
};

export default logger;
