import userModel from "../models/user.model.js";

export const CreateUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email and Password are required');
    }
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userModel.create({
        email,
        password: hashedPassword
    })
    return user;
}

export const getAllUsers = async ({ userId }) => {
    try {
        const allUser = await userModel.find({
            _id: {
                $ne: userId
            }
        });
        return allUser;
    }
    catch (error) {
        throw new Error(error.msg);
    }
}
