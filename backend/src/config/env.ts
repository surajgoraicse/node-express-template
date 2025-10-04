import z from 'zod';
import logger from './logger.js';

const EnvConfigSchema = z.object({
  PORT: z.coerce
    .number({
      required_error: 'PORT  environment variable is required',
      invalid_type_error: 'PORT must be a valid number',
    })
    .int()
    .positive()
    .default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'], {
      required_error: 'NODE_ENV environment variable is required',
      invalid_type_error:
        'NODE_ENV must be one of: development, production, test',
    })
    .default('development'),

  DATABASE_URL: z
    .string({
      required_error: 'DATABASE_URL environment variable is required',
      invalid_type_error: 'DATABASE_URL must be a string',
    })
    .url('DATABASE_URL env var must be URL'),
  JWT_SECRET: z
    .string({
      required_error: 'JWT_SECRET environment variable is required',
      invalid_type_error: 'JWT_SECRET env var must be a string',
    })
    .min(8, 'JWT_SECRET env must be atleast 8 character'),
  SESSION_SECRET: z
    .string({
      invalid_type_error: 'SESSION ENV VAR must be a string',
    })
    .min(8, 'JWT_SECRET env must be atleast 8 character')
    .optional(),

  REDIS_PORT: z.coerce
    .number({
      required_error: 'REDIS_PORT env var is required',
      invalid_type_error: 'REDIS_PORT must be a valid number',
    })
    .int()
    .positive()
    .default(6379),

  REDIS_HOST: z
    .string({
      required_error: 'REDIS_HOST environment variable is required',
      invalid_type_error: 'REDIS_HOST must be a string',
    })
    .default('localhost'),

  REDIS_DB: z.coerce
    .number({
      required_error: 'REDIS_PORT env var is required',
      invalid_type_error: 'REDIS_PORT must be a valid number',
    })
    .int()
    .positive()
    .default(1),

  // SMTP Email configuration
  SMTP_HOST: z.string({
    required_error: 'SMTP_HOST environment variable is required',
    invalid_type_error: 'SMTP_HOST must be a string',
  }),
  SMTP_PORT: z.coerce
    .number({
      required_error: 'SMTP_PORT environment variable is required',
      invalid_type_error: 'SMTP_PORT must be a valid number',
    })
    .int()
    .positive()
    .default(587),
  SMTP_USER: z.string({
    required_error: 'SMTP_USER environment variable is required',
    invalid_type_error: 'SMTP_USER must be a string',
  }),
  SMTP_PASSWORD: z.string({
    required_error: 'SMTP_PASSWORD environment variable is required',
    invalid_type_error: 'SMTP_PASSWORD must be a string',
  }),
  DATABASE_TYPE: z.enum(['POSTGRES', 'MONGO']),

  AUTH_ORIGIN: z.string().url('AUTH_ORIGIN must be a valid URL'),
  BETTER_AUTH_SECRET: z.string({
    required_error: 'JWT_SECRET environment variable is required',
    invalid_type_error: 'JWT_SECRET env var must be a string',
  }),
  GITHUB_CLIENT_ID: z.string({
    required_error: 'GITHUB_CLIENT_ID environment variable is required',
    invalid_type_error: 'GITHUB_CLIENT_ID env var must be a string',
  }),

  GITHUB_CLIENT_SECRET: z.string({
    required_error: 'GITHUB_CLIENT_SECRET environment variable is required',
    invalid_type_error: 'GITHUB_CLIENT_SECRET env var must be a string',
  }),
  GOOGLE_CLIENT_ID: z.string({
    required_error: 'GOOGLE_CLIENT_ID environment variable is required',
    invalid_type_error: 'GOOGLE_CLIENT_ID env var must be a string',
  }),
  GOOGLE_CLIENT_SECRET: z.string({
    required_error: 'GOOGLE_CLIENT_SECRET environment variable is required',
    invalid_type_error: 'GOOGLE_CLIENT_SECRET env var must be a string',
  }),
  CLIENT: z
    .string({
      required_error: 'CLIENT environment variable is required',
      invalid_type_error: 'CLIENT env var must be a string',
    })
    .url({
      message: 'CLIENT env var must be a valid URL',
    }),
});

export type EnvConfig = z.infer<typeof EnvConfigSchema>;

const rawConfig = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_DB: process.env.REDIS_DB,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_TYPE: process.env.DATABASE_TYPE,
  AUTH_ORIGIN: process.env.AUTH_ORIGIN,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CLIENT: process.env.CLIENT,
};

let env: EnvConfig;

try {
  env = EnvConfigSchema.parse(rawConfig);
  logger.info(`Environment Configuration Loaded`);
} catch (error) {
  if (error instanceof z.ZodError) {
    logger.error(
      `Environment Configuration Validation Error : ${error.errors} `
    );
  } else {
    logger.error(
      `Unknown Error during environment config validation :  ${error}`
    );
  }
  process.exit(1);
}

export default env!;
