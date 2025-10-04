import { authenticateUser } from '@/middlewares/auth.middleware.js';
import { Router } from 'express';

const router = Router();

router.use(authenticateUser);

// add user authenticated routes here

export default router;
