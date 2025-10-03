import { Router } from 'express';
import userAuthRoutes from './userAuth.routes.js';

const router = Router();

router.use('/user', userAuthRoutes);
// router.use("/admin", adminAuthRoutes);

export default router;
