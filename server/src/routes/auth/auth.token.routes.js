import { Router } from "express";

import { refreshTokenEndpoint } from "../../controller/auth/auth.controller.js";

const router = Router();

router.post("/refresh", refreshTokenEndpoint);

export default router;
