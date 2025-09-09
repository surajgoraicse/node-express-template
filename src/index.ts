import dotenv from 'dotenv';
import app from './app.js';
import logger from './config/logger.js';
dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
