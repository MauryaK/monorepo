// Shared user types
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}

// API response types
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
}

// Request types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    name: string;
}

// Utility types
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;