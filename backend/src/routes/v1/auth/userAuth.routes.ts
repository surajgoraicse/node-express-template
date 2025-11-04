import userController from '@/modules/user/user.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/register', userController.initRegister);
router.post('/register/verify', userController.verifyRegistration);
router.post('/login', userController.login);
router.post('/otp', userController.resendOtpToMail);
router.post('/password/forgot', userController.forgotPassword);

export default router;
