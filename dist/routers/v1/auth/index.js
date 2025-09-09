import { Router } from "express";
import userAuthRoutes from "./user.routes.js";
import adminAuthRoutes from "./admin.routes.js";
const router = Router();
router.use('/user', userAuthRoutes);
router.use('/admin', adminAuthRoutes);
export default router;
//# sourceMappingURL=index.js.map