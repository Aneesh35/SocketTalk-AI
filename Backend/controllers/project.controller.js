import { validationResult } from "express-validator";
import user from "../models/user.model.js";
import { createProject, getAllProjectByUserId, addUsersToProject ,getProjectDataById } from "../services/project.service.js";

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name } = req.body;
        const loggedInUser = await user.findOne({ email: req.user.email });
        const userId = loggedInUser._id;
        const newProject = await createProject({ name, userId });
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

export const getAllProjectController = async () => {
    try {
        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })
        const allUserProjects = await getAllProjectByUserId({ userId: loggedInUser._id })
        return res.status(200).json({
            projects: allUserProjects
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

export const addUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    try {
        const { projectId, users } = req.body
        const loggedInUser = await user.findOne({
            email: req.user.email
        })
        const project = await addUsersToProject({
            projectId,
            users,
            userId: loggedInUser._id
        })
        return res.status(200).json({
            project
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getProjectById = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await getProjectDataById({ projectId });
        return res.status(200).json({project})
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}