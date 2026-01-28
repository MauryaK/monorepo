import dotenv from 'dotenv';
dotenv.config();

import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'production', 'test']),
        PORT: z.coerce.number().int().positive(),
        JWT_SECRET: z.string().min(16),
        JWT_EXPIRES_IN: z.string().optional(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    },
});
