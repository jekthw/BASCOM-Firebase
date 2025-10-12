import { TokenService } from "./token.service.js";

export const logoutUser = async (req) => {
    const familyId = req.user.family;
    const userId = req.user.id;

    // console.log(req.user);

    // Hapus semua token di family ini
    await TokenService.revokeTokenFamily(userId, familyId);
    return { statusCode: 200, message: "Logout successful from current device",
        payload: { 
            userId: userId,
            userNIS: req.user.nis,
            familyId: familyId,
            nextAction: "LOGIN",
            links: { 
                "login": "POST /auth/login"
            }
        }
    };
};

export const logoutFromAllDevices = async (req) => {
    const userId = req.user.id;

    // Hapus semua token untuk user ini
    await TokenService.revokeAllUserTokens(userId);
    return { statusCode: 200, message: "Logout successful from all devices",
        payload: { 
            userId: userId,
            userNIS: req.user.nis,
            nextAction: "LOGIN",
            links: { 
                "login": "POST /auth/login"
            }
            
        }
    };
}
