import dotenv from 'dotenv';
import app from './app.js';
import envVars from './config/envVars.js';
import logger from './config/logger.js';
dotenv.config({ path: '.env' });
const PORT = envVars.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
