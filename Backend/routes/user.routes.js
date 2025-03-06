import { Router } from "express";
import { createUserController, loginUserController, logoutController, ProfileController, allUserController } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authMiddleware } from "../middleware/auth.middleware.js";


const userRouter = Router();

userRouter.post('/register',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 3 }).withMessage('password must be at-least 3 characters long !!')
    , createUserController);

userRouter.post('/login',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 3 }).withMessage('password must be at-least 3 characters long !!')
    , loginUserController);

userRouter.get('/profile', authMiddleware, ProfileController);

userRouter.get('/Logout', authMiddleware, logoutController);

userRouter.get('/all', authMiddleware, allUserController);

export default userRouter;