import type { AdminLogin } from '@/@types/interface.js';
import type { User } from '@/@types/schema.js';
import envVars from '@/config/envVars.js';
import logger from '@/config/logger.js';
import userService from '@/services/user.service.js';
import APIError from '@/utils/APIError.js';
import catchAsync from '@/utils/async.handler.js';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>;
      admin?: AdminLogin;
    }
  }
}

export const authenticateUser = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn(
        '[AUTH_MIDDLEWARE] No Bearer token found in Authorization header'
      );
      throw new APIError(
        401,
        'Authentication required. Please provide a valid token.'
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, envVars.JWT_SECRET) as jwt.JwtPayload;

      // Check if payload has the required properties
      if (!decoded.id || !decoded.jti) {
        throw new APIError(401, 'Invalid token payload.');
      }
      // Check if user exists
      const user = await userService.getUserById(decoded.id);
      if (!user) {
        throw new APIError(
          401,
          'Unauthorized. User associated with this token not found.'
        );
      }

      // Exclude password from the user object attached to the request
      const { password, ...userWithoutPassword } = user;

      // Attach user to the request object
      req.user = userWithoutPassword;

      logger.info(
        `[AUTH_MIDDLEWARE] User authenticated successfully: ${user.id}`
      );

      next();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      if (error instanceof jwt.TokenExpiredError) {
        logger.warn('[AUTH_MIDDLEWARE] JWT token expired');
        throw new APIError(401, 'Token has expired. Please log in again.');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        logger.warn('[AUTH_MIDDLEWARE] Invalid JWT token');
        throw new APIError(401, 'Invalid token. Please log in again.');
      }
      logger.error('[AUTH_MIDDLEWARE] Unexpected authentication error:', error);
      throw new APIError(
        500,
        'An unexpected error occurred during user authentication.'
      );
    }
  }
);
