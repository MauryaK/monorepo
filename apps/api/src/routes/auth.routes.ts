import { Router, type Router as ExpressRouter } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";

const router: ExpressRouter = Router();
const authController = new AuthController();

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        body("name").optional().isString(),
        validate,
    ],
    authController.register
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").exists().withMessage("Password is required"),
        validate,
    ],
    authController.login
);

export default router;
