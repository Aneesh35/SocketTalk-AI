import { createProjectController, getAllProjectController, addUserController, getProjectById } from "../controllers/project.controller.js";
import Router from 'express'
import { authMiddleware } from "../middleware/auth.middleware.js";
import { body } from 'express-validator';

const projectRouter = Router();

projectRouter.post('/create', authMiddleware,
    body('name').isString().withMessage('Name is required'),
    createProjectController);

projectRouter.get('/all', authMiddleware, getAllProjectController);

projectRouter.put('/add-user', authMiddleware,
    body('projectId').isString().withMessage('Project ID is required'),
    body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    addUserController);
    
projectRouter.get('/get-project/:projectId', authMiddleware, getProjectById)

export default projectRouter;