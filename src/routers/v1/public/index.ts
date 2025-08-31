import { Router } from "express";


const router = Router()

router.get("/", (req, res) => {
	return res.status(200).json({ success: true , message : "this is public route"});
});

export default router