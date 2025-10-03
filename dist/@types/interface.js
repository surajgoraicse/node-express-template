import { z } from 'zod';
export const RegisterSchema = z.object({
    email: z.string().email({ message: 'invalid email id' }),
    fullName: z.string().min(2, 'Name is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});
export const VerifyRegistrationSchema = z.object({
    email: z.string().email(),
    otp: z.string().min(1, 'Verification otp is required'),
});
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, 'Password Length should be more than 8')
        .max(40, 'Password length should be less than 40'),
});
export const EmailOptionsSchema = z.object({
    to: z.string().email(),
    subject: z.string().min(10, 'Subject should be atleast 10 char long'),
    text: z.string().optional(),
    html: z.string().optional(),
});
export const SendContactForm = z.object({
    name: z.string(),
    subject: z.string(),
    message: z.string(),
    email: z.string().email(),
});
export const RefreshTokenSchema = z.object({
    token: z.string().min(1, 'Refresh token is required'),
});
export const AdminLoginSchema = LoginSchema.omit({ password: true });
export const ForgotPasswordSchema = AdminLoginSchema;
export const VerifyLoginSchema = VerifyRegistrationSchema;
//# sourceMappingURL=interface.js.map