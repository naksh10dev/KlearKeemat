import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, we would encrypt this!
  location: { type: String, default: "India" },
  role: { type: String, default: "farmer" },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;