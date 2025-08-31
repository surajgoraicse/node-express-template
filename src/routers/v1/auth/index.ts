import { Router } from "express";
import userAuthRoutes from "./user.routes"
import adminAuthRoutes from "./admin.routes"

const router = Router()

router.use('/user' ,userAuthRoutes)
router.use('/admin' ,adminAuthRoutes)

export default router