import { z } from 'zod';

export const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	JWT_PRIVATE_KEY: z.string(),
	JWT_PUBLIC_KEY: z.string(),
	PORT: z.coerce.number().optional().default(3333),
	HOST_EMAIL_SENDER: z.string(),
	PORT_EMAIL_SENDER: z.coerce.number(),
	USER_EMAIL_SENDER: z.string().email(),
	PASS_EMAIL_SENDER: z.string(),
	APP_NAME: z.string(),
	API_URL: z.string().url(),
	WEB_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
