import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
    return res.status(200).json({ success: true, message: "this is admin route" });
});
export default router;
//# sourceMappingURL=index.js.map