import { z } from 'zod';

export const registerUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must combination A-Z a-z 0-9 special characters")
        .regex(/[A-Z]/, "Password must combination A-Z a-z 0-9 special characters")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must combination A-Z a-z 0-9 special characters"),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    isactive: z.boolean(),
});

export const loginUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
    isactive: boolean;
    createdAt: Date;
    updatedAt: Date;
};
export type AuthResponse = {
    SuccessStatus: boolean;
    CustomMessage: string;
    ActualError?: string;
    token?: string;
    user?: Omit<User, 'password'>;
}


export const authUserSchema = z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().optional(), // Making it optional to be safe, or required if we are sure
});

export type AuthUser = z.infer<typeof authUserSchema>;
export type StandardApiResponse<T = undefined> = {
    SuccessStatus: boolean;
    CustomMessage: string;
    ActualError?: string;
    data?: T;
};

