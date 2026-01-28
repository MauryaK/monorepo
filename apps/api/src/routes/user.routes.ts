// src/routes/user.routes.ts
import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router: Router = Router();

// Public routes
router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post('/logout', userController.logout.bind(userController));

router.post('/logout', authMiddleware, userController.logout.bind(userController));
router.get('/get-users', userController.getUsers);

// // Protected routes
// router.get('/profile', authenticate, userController.getProfile);

export default router;