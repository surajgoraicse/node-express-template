import { v1 } from '@/controllers/index.js';
import { Router } from 'express';
const router = Router();
router.post('/login', v1.auth.admin.login);
router.post('/login', v1.auth.admin.verifyLogin);
export default router;
//# sourceMappingURL=admin.routes.js.map