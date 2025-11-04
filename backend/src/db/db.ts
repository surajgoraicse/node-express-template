// import { PrismaClient } from '@/generated/prisma/index.js';
// import logger from './logger.js';

// export const client = new PrismaClient();

// export const connectDb = async () => {
//   try {
//     await client.$connect();
//     logger.info('[PRISMA] : Connected to PostgreSQL database.');
//     return client;
//   } catch (error) {
//     logger.error('[PRISMA] : Failed to connect to PostgreSQL:', error);
//     process.exit(1); // Exit process on a critical error
//   }
// };

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const connectDb = () => {
  const db = drizzle({
    connection: {
      connectionString: process.env.DATABASE_URL!,
      ssl: false,
    },
  });
  return db;
};

