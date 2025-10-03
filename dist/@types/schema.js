import z from 'zod';
export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email({ message: 'invalid email id' }),
    fullName: z.string().min(2, 'Name is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});
export const UserCreateSchema = z.object({
    email: z.string().email({ message: 'invalid email id' }),
    fullName: z.string().min(2, 'Name is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});
//# sourceMappingURL=schema.js.map