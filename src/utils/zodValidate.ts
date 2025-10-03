import logger from '@/config/logger.js';
import type z from 'zod';

export function zodValidate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const res = schema.safeParse(data);
  if (!res.success) {
    logger.error(`[ZOD VALIDATION ERROR]: ${res.error.format()}`);
    throw new Error(JSON.stringify(res.error.format()));
  }

  return res.data;
}
