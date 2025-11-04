import { redis } from '@/index.js';
import logger from '../config/logger.js';
import APIError from '../utils/apiError.js';

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function generateOtp(email: string): Promise<string> {
  try {
    const otp = generateCode();
    logger.debug('i am here..');
    await redis.setValue(`otp:${email}`, otp, 60 * 5);
    logger.debug(`[OTP SERVICE] otp store in redis`);

    return otp;
  } catch (error) {
    throw new APIError(400, 'Failed to save otp in redis');
  }
}

async function verifyOtp(email: string, otp: string): Promise<Boolean> {
  try {
    const storedOtp = await redis.getValue(`otp:${email}`);
    if (!storedOtp) {
      return false;
    }
    if (otp == storedOtp) {
      await redis.deleteValue(`otp:${email}`);
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`[REDIS] : redis error at OTP verification`, error);
    throw new Error('[REDIS] : redis error at OTP verification');
  }
}

export default {
  generateOtp,
  verifyOtp,
};
