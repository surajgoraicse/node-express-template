import APIError from '@/utils/APIError.js';
import jwt from 'jsonwebtoken';

export enum AccountType {
  ADMIN = 'admin',
  USER = 'user',
}

export type Payload = {
  id: string;
  jti: string;
  accountType: AccountType;
};

const JWT_SECRET = process.env.JWT_SECRET;

export const signToken = (payload: Payload, expiresIn: string = '7d') => {
  try {
    return jwt.sign(payload, JWT_SECRET as string, {
      expiresIn: expiresIn as any,
    });
  } catch (error) {
    throw new APIError(500, `[TOKEN_SERVICE] JWT Token creation failed`);
  }
};

export const generateTokens = (payload: Payload) => {
  const accessToken = signToken(payload, '1d');
  const refreshToken = signToken(payload, '7d');
  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET as string);
};
