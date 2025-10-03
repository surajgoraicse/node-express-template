import { AdminLoginSchema, VerifyLoginSchema } from '@/@types/interface.js';
import { db } from '@/config/database.js';
import otpService from '@/services/otp.service.js';
import { AccountType, generateTokens } from '@/services/token.service.js';
import APIError from '@/utils/APIError.js';
import APIResponse from '@/utils/APIResponse.js';
import catchAsync from '@/utils/async.handler.js';
import type { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const login = catchAsync(async (req: Request, res: Response) => {
  const { success, data: adminData } = AdminLoginSchema.safeParse(req.body);
  if (!success) {
    throw new APIError(400, 'Invalid Admin Input, Email is required');
  }
  const admin = await db.admin.findUnique({
    where: {
      email: adminData.email,
    },
  });
  if (!admin) {
    throw new APIError(404, 'Admin Not Found');
  }

  const otp = await otpService.generateOtp(admin.email);
  res.status(200).json(new APIResponse(200, 'Admin OTP sent.', { otp }));
  return;
});

const verifyLogin = catchAsync(async (req: Request, res: Response) => {
  const { success, data: adminData } = VerifyLoginSchema.safeParse(req.body);
  if (!success) {
    throw new APIError(400, 'Invalid OTP and Email. ');
  }
  const isVerified = await otpService.verifyOtp(adminData.email, adminData.otp);

  if (!isVerified) {
    throw new APIError(400, 'Invalid OTP, Try Again');
  }

  const admin = await db.admin.findUnique({
    where: {
      email: adminData.email,
    },
  });
  if (!admin) {
    throw new APIError(404, 'Admin Not Found');
  }

  const jti = uuidv4();
  const token = generateTokens({
    id: admin.id,
    accountType: AccountType.ADMIN,
    jti,
  });
  res.json(
    new APIResponse(200, 'Admin Login Successfully', {
      token,
    })
  );
  return;
});

export default {
  login,
  verifyLogin,
};
