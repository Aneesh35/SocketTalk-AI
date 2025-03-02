import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET

const schema = mongoose.Schema;

const UserSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be at least 6 characters long'],
        maxLength: [50, 'Email must not be longer than 50 characters']
    },
    password: {
        type: String,
        select: false,
    }
})

UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);

}

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateJwt = function () {
    return jwt.sign({ email: this.email }, secret, { expiresIn: '24h' });
}

const user = mongoose.model('users', UserSchema);

export default user;