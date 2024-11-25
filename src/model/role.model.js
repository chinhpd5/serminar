import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value:{
        type:Number,
        default: 0
    },
    description: {
        type: String
    },
    permissionsId:[
        {
            type: mongoose.Schema.Types.ObjectId, // Kiểu dữ liệu của _id
            ref: 'Permissions'
        }
    ]
},{versionKey: false, timestamps: true});

export default mongoose.model("Roles",roleSchema)

