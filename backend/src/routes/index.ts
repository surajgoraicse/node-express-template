import ApiResponse from '@/utils/apiResponse.js';
import { Router } from 'express';
import v1Routes from './v1/index.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json(new ApiResponse(200, 'Hello world'));
});

router.use('/v1', v1Routes);

export default router;
