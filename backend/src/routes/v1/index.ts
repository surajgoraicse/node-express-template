import { Router } from 'express';
import adminRoutes from './admin/index.js';
import authRoutes from './auth/index.js';
import userRoutes from './user/index.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

export default router;
