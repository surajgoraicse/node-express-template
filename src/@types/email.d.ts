import { z } from "zod";

export const EmailOptionsSchema = z.object({
	to: z.string().email(),
	subject: z.string(),
	text: z.string(),
	html: z.string().optional(),
});

export type EmailInterface = z.infer<typeof EmailOptionsSchema>;
