
import { User, AuthResponse, RegisterUserInput, LoginUserInput } from '@erp/shared-types';
import { prisma } from '@repo/database';
import { generateToken } from '../utils/jwt.js';
import { comparePassword, hashPassword } from '../utils/bcrypt.js';


export class UserService {
    // @ New User Registration
    async register(userData: RegisterUserInput): Promise<AuthResponse> {
        try {
            const { email, name, isactive } = userData;

            const existingUser = await prisma.user.findUnique({ where: { email: email } });
            if (existingUser) {
                return {
                    SuccessStatus: false,
                    CustomMessage: 'User already exists',
                    ActualError: 'User with this email already exists',
                };
            }

            const hashedPassword = await hashPassword(userData.password);

            const newUser: User = {
                id: Date.now().toString(),
                email: email,
                name: name,
                password: hashedPassword,
                isactive: isactive,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const res = await prisma.user.create({ data: newUser });

            // Generate JWT token
            const token = generateToken({ userId: newUser.id, email: newUser.email });

            // Remove password from response
            const { password, ...userWithoutPassword } = newUser;

            return {
                SuccessStatus: true,
                CustomMessage: res.toString(),
                token,
                user: userWithoutPassword,
            };
        } catch (error: any) {
            return {
                SuccessStatus: false,
                CustomMessage: 'Registration failed',
                ActualError: error instanceof Error ? error.message : String(error),
            };
        }
    }

    // @ Login Service
    async login(data: LoginUserInput): Promise<AuthResponse> {
        try {
            const { email, password } = data;

            // Find user by email
            const user = await prisma.user.findUnique(
                {
                    where: { email },
                    select: {
                        id: true,
                        email: true,
                        password: true,
                        name: true,
                        isactive: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                }
            );
            if (!user) {
                return {
                    SuccessStatus: false,
                    CustomMessage: 'Invalid email or password',
                    ActualError: 'Invalid email or password',
                };
            };
            // Verify password
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return {
                    SuccessStatus: false,
                    CustomMessage: 'Invalid email or password',
                    ActualError: 'Invalid email or password',
                };
            };
            if (!user.isactive) {
                return {
                    SuccessStatus: false,
                    CustomMessage: 'User account is inactive',
                    ActualError: 'User account is inactive',
                };
            }

            // Generate token
            const token = generateToken({ userId: user.id, email: user.email });

            // Remove passwordHash from response
            const { password: _passwordHash, ...userWithoutPassword } = user;
            return {
                SuccessStatus: true,
                CustomMessage: 'Login successful',
                token,
                user: userWithoutPassword,
            };
        } catch (error) {
            return {
                SuccessStatus: false,
                CustomMessage: 'Login failed',
                ActualError: error instanceof Error ? error.message : String(error),
            };
        }
    }


    async getUsers(): Promise<User[]> {
        const alluser = await prisma.user.findMany();
        return alluser;
    }

}


export const userService = new UserService();