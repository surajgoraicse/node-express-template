import { Router } from "express";
import authRoutes from "./auth";
import adminRoutes from "./admin";
import publicRoutes from "./public";
import userRoutes from "./user";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/public", publicRoutes);

export default router;
