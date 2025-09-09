import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import app from "./app.js";
import path from "path";
import logger from "./config/logger.js";
import { __dirname } from "./utils/utils.js";

const pa = path.join(__dirname, "../.env");
console.log(pa);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	logger.info(`Server is running at http://localhost:${PORT}`);
});
