import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import apiKeyRoutes from "./API/apiKey.routes.js";

export const routerv1 = Router();

routerv1.use("/auth", authRoutes);
routerv1.use("/apiKey", apiKeyRoutes);
