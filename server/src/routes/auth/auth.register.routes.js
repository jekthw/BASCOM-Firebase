import { Router } from "express";

import { 
    register, 
    getCache, 
    deleteUserCache, 
    manualVerification, 
    manualVerificationUpdate, 
    cancelRegistration 
} from "../../controller/auth/auth.controller.js";

const router = Router();

router.post("/", register);
router.post("/manual-verification/:nis", manualVerification);
router.patch("/manual-verification/:nis", manualVerificationUpdate);
router.get("/cache/:nis", getCache);
router.delete("/cache/:nis", deleteUserCache);
router.delete("/cancel/:nis", cancelRegistration);


export default router;
