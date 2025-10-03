import {
  UserCreateSchema,
  type User,
  type UserCreate,
} from '@/@types/schema.js';
import { db } from '@/config/database.js';
import logger from '@/config/logger.js';
import APIError from '@/utils/APIError.js';

class UserService {
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({ where: { email } });
      if (!user) {
        logger.warn(`[USER_SERVICE] User not found with email ${email} `);
        return null;
      }

      logger.info(
        `[USER SERVICE] User retrieved successfully with email: ${email} `
      );
      return user;
    } catch (error) {
      logger.error(
        `[USER_SERIVCE] Error getting user by eamil ${email}`,
        error
      );
      throw new APIError(500, 'Failed to retrieve user');
    }
  }
  async createUser(userData: UserCreate): Promise<User | null> {
    try {
      const validateData = UserCreateSchema.safeParse(userData);
      if (!validateData.success) {
        throw new APIError(
          400,
          `[USER SERVICE] : User Creation Data validation failed : `,
          validateData.error.format()
        );
      }

      // check if email exists. user might create a profile in the time gap between otp expiry
      const existingUser = await db.user.findUnique({
        where: { email: validateData.data.email },
        select: { id: true }, // returns only the id field
      });
      if (existingUser) {
        throw new APIError(
          400,
          'User with this email already exists. Please use a different email'
        );
      }

      // check if admin exists with the same email
      const adminExists = await db.admin.findUnique({
        where: { email: validateData.data.email },
        select: { id: true }, // returns only the id field
      });
      if (adminExists) {
        throw new APIError(
          400,
          'User with this email already exists as Admin. Please use a different email'
        );
      }

      // create user
      const user = await db.user.create({
        data: validateData.data,
      });
      logger.info(
        `[USER_SERVICE] : User Created Successfully with ID : ${user.id}`
      );
      return user;
    } catch (error: any) {
      throw new APIError(
        500,
        `[USER_SCHEMA] : User Creation Failed Server Error  `,
        error
      );
    }
  }
  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({
        where: { id },
      });
      if (!user) {
        logger.warn(`[USER_SERVICE] : User not found with ID: ${id}`);
        return null;
      }
      logger.info(
        `[USER_SERVICE] : User retrieved successfully with ID: ${id}`
      );
      return user;
    } catch (error) {
      logger.error(`[USER_SERVICE] : error at getUserById : ${id} `, error);
      throw new APIError(500, 'Failed to retrieve user');
    }
  }
}

export default new UserService();
