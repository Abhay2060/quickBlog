import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, default: "user" },
  password: String,
  otp: String,
  otpExpires: Date,
  profileImage: {
  type: String,
  default: ""
}

},{ timestamps: true});

export default mongoose.model("User", userSchema);
