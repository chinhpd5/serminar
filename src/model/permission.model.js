import mongoose from "mongoose";

const permissionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{versionKey: false, timestamps: true});

export default mongoose.model("Permissions",permissionSchema);