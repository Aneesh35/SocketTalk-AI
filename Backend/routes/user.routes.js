import { Router } from "express";
import { createUserController, loginUserController, logoutController, ProfileController } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 3 }).withMessage('password must be at-least 3 characters long !!')
    , createUserController);

router.post('/login',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 3 }).withMessage('password must be at-least 3 characters long !!')
    , loginUserController);

router.get('/profile', authMiddleware, ProfileController);

router.get('/Logout', authMiddleware, logoutController);

export default router;