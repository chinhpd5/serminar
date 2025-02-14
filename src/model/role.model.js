import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  // permissions: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: 'Permission'
  //   }
  // ]
})

export default mongoose.model('Role', roleSchema);