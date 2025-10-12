import { Router } from "express";
import registerRoutes from "./auth.register.routes.js";
import loginRoutes from "./auth.login.routes.js";
import tokenRoutes from "./auth.token.routes.js";
import logoutRoutes from "./auth.logout.js";
import { authMiddleware } from "../../middleware/authToken.middleware.js";

const router = Router();

router.use("/register", registerRoutes);
router.use("/token", tokenRoutes);
router.use("/login",  loginRoutes);
router.use("/logout", authMiddleware, logoutRoutes);



export default router;
