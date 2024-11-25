import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number, // 0: Member, 1: Admin
        default: 0
    }
},{versionKey: false, timestamps:true})

export default mongoose.model('Users',userSchema);