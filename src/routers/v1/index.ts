import { Router } from "express";
import authRoutes from "./auth/index.js";
import adminRoutes from "./admin/index.js";
import publicRoutes from "./public/index.js";
import userRoutes from "./user/index.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/public", publicRoutes);

export default router;
