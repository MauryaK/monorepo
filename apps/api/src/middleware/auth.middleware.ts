import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

export interface AuthRequest extends Request {
  userId?: string;
  email?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    // Get token from cookie
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({
        SuccessStatus: false,
        CustomMessage: 'Authentication required',
        ActualError: 'No token provided',
      });
      return;
    }

    // Verify token
    const decoded = verifyToken(token);

    // Add user info to request
    req.userId = decoded.userId;
    req.email = decoded.email;

    next();
  } catch (error) {
    res.status(401).json({
      SuccessStatus: false,
      CustomMessage: 'Authentication failed',
      ActualError: error instanceof Error ? error.message : String(error),
    });
  }
};
