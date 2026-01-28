import { Request, Response } from 'express';
import { userService } from '../services/user.service.js';
import { loginUserSchema } from '@erp/shared-types';

export class UserController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, name } = req.body;
            const result = await userService.register({ email, password, name, isactive: false });
            if (result.ActualError) {
                res.status(400).json({
                    SuccessStatus: false,
                    CustomMessage: result.ActualError,
                    ActualError: result.CustomMessage || 'Registration failed',
                });
                return;
            }
            res.status(201).json({
                SuccessStatus: true,
                data: result,
                CustomMessage: 'User registered successfully',
            });
            return;
        } catch (error) {
            res.status(400).json({
                SuccessStatus: false,
                ActualError: error instanceof Error ? error.message : 'Registration failed',
            });
            return;
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const validationResult = loginUserSchema.safeParse(req.body);
            if (!validationResult.success) {
                res.status(400).json({
                    SuccessStatus: false,
                    CustomMessage: 'Validation failed',
                    ActualError: JSON.stringify(validationResult.error.errors),
                });
                return;
            }
            const result = await userService.login(validationResult.data);
            if (result.SuccessStatus) {
                res.cookie('token', result.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });
                res.json(result);
            } else {
                res.status(401).json(result);
            }
        } catch (error) {
            res.status(500).json({
                SuccessStatus: false,
                CustomMessage: 'Internal server error',
                ActualError: error instanceof Error ? error.message : String(error),
            });
        }
    }


    async logout(_req: Request, res: Response): Promise<void> {
        try {
            // Clear the token cookie
            res.clearCookie('token');

            res.json({
                SuccessStatus: true,
                CustomMessage: 'Logout successful',
            });
        } catch (error) {
            res.status(500).json({
                SuccessStatus: false,
                CustomMessage: 'Internal server error',
                ActualError: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Gell User List
    async getUsers(_req: Request, res: Response) {
        try {
            // For demonstration, returning a static list
            const users = await userService.getUsers();
            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'No users founds',
                });
            }
            return res.status(200).json({
                success: true,
                data: users,
                message: 'Users retrieved successfully',
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to retrieve users',
            });
        }
    }
}
export const userController = new UserController();