import { z } from "zod";

export const RegisterSchema = z.object({
	email: z.string().email({ message: "invalid email id" }),
	fullName: z.string().min(2, "Name is required"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});
export type Register = z.infer<typeof RegisterSchema>;
