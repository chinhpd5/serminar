import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ["admin","author","member"],
    default: "member"
  }
},{versionKey: false, timestamps: true});

export default mongoose.model('Users',userModel);
