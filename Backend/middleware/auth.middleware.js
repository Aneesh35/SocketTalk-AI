import jwt from "jsonwebtoken"
import redisClient from "../services/redis.service.js";
const secret = process.env.SECRET;

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] || req.cookies.token;
        if (!token) {
            return res.status(400).json({ error: "Unauthorized users" });
        }

        const isBlackListed = await redisClient.get(token);
        if (isBlackListed) {
            res.cookie('token', '')
            return res.status(400).send({ error: 'Unauthorized user' })
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ error: "Invalid user!!" })
    }
}