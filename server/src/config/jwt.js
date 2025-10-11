import dotenv from "dotenv";
dotenv.config();

// fungsi bantu buat ubah "15m" -> detik
function parseExpiry(value) {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return parseInt(value, 10); // angka murni, misal "900"
  const match = value.match(/^(\d+)([smhd])$/); // format "15m", "7d"
  if (!match) return parseInt(value, 10);

  const num = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s": return num;
    case "m": return num * 60;
    case "h": return num * 60 * 60;
    case "d": return num * 60 * 60 * 24;
    default: return num;
  }
}

export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiresIn: parseExpiry(process.env.JWT_ACCESS_EXPIRES || "15m"), 
  refreshExpiresIn: parseExpiry(process.env.JWT_REFRESH_EXPIRES || "7d"),
};
