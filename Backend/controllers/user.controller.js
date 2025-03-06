import userModel from "../models/user.model.js";
import { CreateUser, getAllUsers } from "../services/user.services.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await CreateUser(req.body);
        const token = await user.generateJwt();
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        const token = await user.generateJwt();
        delete user._doc.password;
        res.status(200).json({ user, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const ProfileController = async (req, res) => {
    res.status(200).json({ user: req.user })
}

export const logoutController = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1] || req.cookies.token;
        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
        res.status(200).json({ message: 'logout successful' });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const allUserController = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })
        const allUser = await getAllUsers({ userId: loggedInUser._id });
        res.status(200).json(allUser);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
