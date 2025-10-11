import bcrypt from "bcryptjs";
import crypto from "crypto";

/**
 * Generate random API key
 */
export const generateApiKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

export const hashApiKey = async (key) => {
    return crypto.createHash("sha256").update(key).digest("hex");
};

/**
 * Hash a password using bcrypt
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} The hashed password
 */
export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - The plain text password to check
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

/**
 * Check password rules
 * @param {string} password
 * @returns {string[]} array of errors, empty if password valid
 */
export const passwordRegex = (password) => {
    const errors = [];

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must include at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Password must include at least one lowercase letter");
    }
    if (!/\d/.test(password)) {
        errors.push("Password must include at least one number");
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        errors.push("Password must include at least one special character");
    }

    return errors; // [] if valid
};