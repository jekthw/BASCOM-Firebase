import { response } from "../../utils/response.js";
import { registerUser } from "../../services/auth/register.service.js";
import { loginUser } from "../../services/auth/login.service.js";
import { ValidationError } from "../../utils/validationError.js";
import { getRejectedOrNotFoundUser, deleteRejectedOrNotFoundUser } from "../../services/auth/rejectedUserCache.service.js";
import { refreshToken as refreshTokenService } from "../../services/auth/refreshToken.service.js";
import { logoutUser, logoutFromAllDevices as logoutAllDevices } from "../../services/auth/logout.service.js";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req);
    return response(res, result.statusCode, result.message, result.payload);
  } catch (error) {
    if (error instanceof ValidationError) {
      return response(res, error.statusCode, error.message, null, error.errorsList);
    }
    return response(res, 500, "Internal Server Error", null, [error.message]);
  }
};

export const getCache = async (req, res) => {
  try {
    const { nis } = req.params;
    const user = await getRejectedOrNotFoundUser(nis);
    if (user) {
      return response(res, 200, `Data retrieved ${nis}`, user);
    }
    return response(res, 404, `Data for ${nis} not found`);
  } catch (error) {
    return response(res, 500, "Internal Server Error", null, [error.message]);
  }
};

export const deleteUserCache = async (req, res) => {
  try {
    const { nis } = req.params;
    const result = await deleteRejectedOrNotFoundUser(nis);
    if (result) {
      return response(res, 200, `Data for ${nis} successfully deleted`);
    }
    return response(res, 404, `Data for ${nis} not found`);
  } catch (error) {
    return response(res, 500, "Internal Server Error", null, [error.message]);
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req);

    // Set refresh token as httpOnly cookie (secure af no cap)
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,  // Frontend ga bisa akses via JS (anti XSS)
      secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
      sameSite: "strict", // Anti CSRF attack
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send access token in response body
    // Frontend will use this in "Authorization: Bearer <token>" header for future requests
    return response(res, 200, "Login successful", {
      user: result.user,
      accessToken: result.accessToken,
      familyId: result.familyId
      // refreshToken NOT included here for security (it's in cookie)
    });

  } catch (error) {
    // Handle ValidationError or any other errors
    if (error instanceof ValidationError) {
      return response(res, error.statusCode, error.message, null, error.errorsList);
    }
    return response(res, 500, "Internal server error", null, [error.message]);
  }
};

export const refreshTokenEndpoint = async (req, res) => {
    try {
      const result = await refreshTokenService(req);
      
      // Set refresh token baru
      res.cookie("refreshToken", result.newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      
      return response(res, 200, "Token refreshed", { accessToken: result.accessToken });
      
    } catch (err) {
      if (err instanceof ValidationError) {
        return response(res, err.statusCode, err.message, err.payload || null, err.errorsList);
      }
      console.error("Refresh token error:", err);
      return response(res, 500, "Refresh failed", null, [err.message]);
    }
};

export const logout = async (req, res) => {
  try {
    const result = await logoutUser(req);

    res.clearCookie("refreshToken");

    return response(res, result.statusCode, result.message, result.payload);
  } catch (error) {
    return response(res, 500, "Internal server error", null, [error.message]);
  }
}

export const logoutFromAllDevices = async (req, res) => {
  try {

    res.clearCookie("refreshToken");
    
    const result = await logoutAllDevices(req);
    return response(res, result.statusCode, result.message, result.payload);
  } catch (error) {
    return response(res, 500, "Internal server error", null, [error.message]);
  }
};
