import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  // appliedJobs: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Job',
  // }],
  // Additional fields can be added as needed
});

const User = model("User", userSchema);
export default User;
