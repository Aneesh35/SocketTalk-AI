import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    fileTree: {
        type: Object,
        default: {}
    },
})

const project = mongoose.model('projects', projectSchema);

export default project