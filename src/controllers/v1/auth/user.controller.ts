import { type Register, RegisterSchema } from '@/@types/interface.js';
import { redis } from '@/config/database.js';
import logger from '@/config/logger.js';
import emailService from '@/services/email.service.js';
import otpService from '@/services/otp.service.js';
import { AccountType, generateTokens } from '@/services/token.service.js';
import userService from '@/services/user.service.js';
import { hashPassword } from '@/tools/encryption.js';
import APIError from '@/utils/APIError.js';
import APIResponse from '@/utils/APIResponse.js';
import catchAsync from '@/utils/async.handler.js';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const initRegister = catchAsync(async (req: Request, res: Response) => {
  const { email, password, fullName }: Register = req.body;
  const validateData = RegisterSchema.safeParse({
    email,
    password,
    fullName,
  });
  if (!validateData.success) {
    throw new APIError(
      400,
      'Register Data validation failed',
      validateData.error?.format()
    );
  }
  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) {
    throw new APIError(400, 'User Email already exists');
  }
  const hashedPassword = await hashPassword(password);
  await redis.setValue(
    `register:${email}`,
    JSON.stringify({
      email,
      fullName,
      password: hashedPassword,
    }),
    60 * 5
  );

  const otp = await otpService.generateOtp(email);

  await emailService.sendEmail({
    to: email,
    subject: 'Your OTP code ',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes`,
  });
  logger.debug('otp : ', otp);
  res.status(200).json(
    new APIResponse(200, 'OTP sent to your Email for Verification', {
      otp: otp,
    })
  );
});

const verifyRegistration = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new APIError(400, 'Email and OTP are requried');
  }

  const user_data = await redis.getValue(`register:${email}`);
  if (!user_data) {
    throw new APIError(400, 'Registration session expired or not found');
  }
  const parsedUser = JSON.parse(user_data);
  const isVerified = await otpService.verifyOtp(email, otp);


  if (!isVerified) {
    throw new APIError(400, 'Invalid OTP');
  }
  const user = await userService.createUser({
    email: parsedUser.email,
    fullName: parsedUser.fullName,
    password: parsedUser.password,
  });

  if (!user) {
    throw new APIError(
      500,
      `[USER_CONTROLLER] : User Verify Registration Error`
    );
  }
  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens({
    accountType: AccountType.USER,
    id: user.id,
    jti,
  });

  // clean up redis data after registration
  await redis.deleteValue(`register:${email}`);


  res.status(201).json(
    new APIResponse(201, 'User Created Successfully', {
      token: { accessToken, refreshToken },
    })
  );
  return;
});

export default {
  initRegister,
  verifyRegistration,
};
