import { Router } from "express";
import v1Routes from "./v1";
const router = Router();

router.get("/health", (req, res) => {
	res.status(200).json({
		status: "ok",
		message: "server is running",
		timeStamp: new Date().toISOString(),
	});
});

router.use("/v1", v1Routes);

export default router;
