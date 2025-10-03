import logger from '@/config/logger.js';
import { db } from '@/index.js';
import ApiError from '@/utils/apiError.js';
import { CreateUserSchema, type CreateUser, type User } from './user.types.js';

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
      throw new ApiError(500, 'Failed to retrieve user');
    }
  }
  async createUser(userData: CreateUser): Promise<User | null> {
    try {
      const validateData = CreateUserSchema.safeParse(userData);
      if (!validateData.success) {
        throw new ApiError(
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
        throw new ApiError(
          400,
          'User with this email already exists. Please use a different email'
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
      throw new ApiError(
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
      throw new ApiError(500, 'Failed to retrieve user');
    }
  }
}

const userService = new UserService();
export default userService;
