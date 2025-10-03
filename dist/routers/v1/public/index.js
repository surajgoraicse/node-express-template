import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    throw new Error('some error');
    return res
        .status(200)
        .json({ success: true, message: 'this is public route' });
});
export default router;
//# sourceMappingURL=index.js.map