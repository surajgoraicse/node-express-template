import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'invalid email id' }),
  fullName: z.string().min(2, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type Register = z.infer<typeof RegisterSchema>;

export const VerifyRegistrationSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(1, 'Verification otp is required'),
});
export type VerifyRegistration = z.infer<typeof VerifyRegistrationSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password Length should be more than 8')
    .max(40, 'Password length should be less than 40'),
});
export type Login = z.infer<typeof LoginSchema>;

export const EmailOptionsSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(10, 'Subject should be atleast 10 char long'),
  text: z.string().optional(),
  html: z.string().optional(),
});
export type EmailOptions = z.infer<typeof EmailOptionsSchema>;

export const SendContactForm = z.object({
  name: z.string(),
  subject: z.string(),
  message: z.string(),
  email: z.string().email(),
});
export type SendContact = z.infer<typeof SendContactForm>;

export const RefreshTokenSchema = z.object({
  token: z.string().min(1, 'Refresh token is required'),
});

export const AdminLoginSchema = LoginSchema.omit({ password: true });
export const ForgotPasswordSchema = AdminLoginSchema;
export const VerifyLoginSchema = VerifyRegistrationSchema;

export type VerifyLogin = z.infer<typeof VerifyLoginSchema>;
export type AdminLogin = z.infer<typeof AdminLoginSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type RefreshToken = z.infer<typeof RefreshTokenSchema>;