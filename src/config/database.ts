import { PrismaClient } from '@prisma/client';
import RedisService from '../services/redis.service.js';
import logger from './logger.js';

declare global {
  var prisma: PrismaClient;
  var redis: RedisService;
}
// In development with hot-reloading (e.g., Next.js, Nodemon, Vite), new objects get re-created on every restart, which can cause:

// Multiple database connections

// Multiple Redis connections

// By attaching them to global, you reuse existing instances instead of creating new ones each time.
// This extends the Node.js global object with:

// global.prisma: PrismaClient

// global.redis: RedisService

export const db = global.prisma || new PrismaClient();

db.$connect()
  .then(() => {
    logger.info('[PRISMA] : connected to database');
  })
  .catch((error: string) => {
    logger.error('[PRISMA] : failed to connect database : ', error);
  });

export const redis = global.redis || new RedisService();
