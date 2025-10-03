import { v1 } from '@/controllers/index.js';
import { Router } from 'express';
const router = Router();
router.post('/register', v1.auth.user.initRegister);
router.post('/register/verify', v1.auth.user.verifyRegistration);
router.post('/login', v1.auth.user.login);
router.post('/otp', v1.auth.user.resendOtpToMail);
router.post('/password/forgot', v1.auth.user.forgotPassword);
export default router;
//# sourceMappingURL=user.routes.js.map