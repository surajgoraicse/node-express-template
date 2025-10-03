import { Router } from "express";
import { authenticateUser } from "@/middlewares/auth.middleware.js";
const router = Router();
router.use(authenticateUser);
// add user authenticated routes here
export default router;
//# sourceMappingURL=index.js.map