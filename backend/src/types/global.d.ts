import { User } from '@/modules/user/user.types.ts';

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>;
    }
  }
}
