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
  roleId:{
    type: mongoose.Schema.ObjectId,
    ref: 'Role'
  }
},{versionKey: false, timestamps: true});

export default mongoose.model('Users',userModel);
