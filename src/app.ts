import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routers/index.js";
import handleError from "./middlewares/handleError.middleware.js";

const app = express();


app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api", router);

app.use(handleError);

export default app;
