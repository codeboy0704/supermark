import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    unique: true,
  },
  createdAt: Date,
});

const UserModel = mongoose.model("user", userSchema);
export default UserModel;
