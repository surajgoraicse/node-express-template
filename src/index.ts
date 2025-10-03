import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDb } from './config/db.js';
import env from './config/env.js';
import logger from './config/logger.js';
import handleError from './middlewares/handleError.middleware.js';
import router from './routes/index.js';
import RedisService from './services/redis.service.js';
dotenv.config();

const PORT = env.PORT;

// database
export const db = global.db || (await connectDb());
global.db = db;
export const redis = global.redis || new RedisService();
global.redis = redis;

// express app config here
const app = express();

app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api', router);

app.use(handleError);
app.listen(PORT, () => {
  logger.info(`Server is listening at port ${PORT}`);
});
