import { Router } from "express";
import registerRoutes from "./auth.register.routes.js";
import loginRoutes from "./auth.login.routes.js";
import tokenRoutes from "./auth.token.routes.js";

const router = Router();

router.use("/register", registerRoutes);
router.use("/token", tokenRoutes);
router.use("/login", loginRoutes);



export default router;
