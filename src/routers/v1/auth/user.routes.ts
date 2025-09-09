import { v1 } from "@/controllers/index.js";
import { Router } from "express";


const router = Router()

router.post("/register", v1.auth.user.initRegister)
router.post("/register/verify", v1.auth.user.verifyRegistration)


export default router