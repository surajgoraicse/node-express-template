import type { PrismaClient } from '@/generated/prisma/index.js';
import type RedisService from '@/services/redis.service.js';
import { z } from 'zod';

export const EmailOptionsSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  text: z.string(),
  html: z.string().optional(),
});

export type EmailInterface = z.infer<typeof EmailOptionsSchema>;

declare global {
  var db: PrismaClient | undefined;
  var redis: RedisService | undefined;
}

export const RefreshTokenSchema = z.object({
  token: z.string().min(1, 'Refresh token is required'),
});
export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
