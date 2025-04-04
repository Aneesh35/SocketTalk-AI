import { Router } from "express";
import { getResultController } from "../controllers/ai.controller.js";
export const aiRouter=Router();
aiRouter.get('/get-result',getResultController)
