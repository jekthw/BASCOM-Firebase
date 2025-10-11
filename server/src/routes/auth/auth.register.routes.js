import { Router } from "express";

import { register, getCache, deleteUserCache } from "../../controller/auth/auth.controller.js";

const router = Router();

router.post("/", register);
router.get("/cache/:nis", getCache);
router.delete("/cache/:nis", deleteUserCache);


export default router;
