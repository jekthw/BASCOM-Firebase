import { Router } from "express";
import { logout, logoutFromAllDevices } from "../../controller/auth/auth.controller.js";

const router = Router();

router.post("/", logout);
router.post("/all", logoutFromAllDevices);

export default router;