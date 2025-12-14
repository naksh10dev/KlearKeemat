import mongoose, { Schema, model, models } from "mongoose";

const CropSchema = new Schema({
  name: { type: String, required: true },
  variety: { type: String },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  mobile: { type: String, required: true }, // Contact number for buyers
  location: { type: String, required: true }, // e.g. "Punjab"
  createdAt: { type: Date, default: Date.now },
});

// Check if model exists before creating (prevents errors on hot-reload)
const Crop = models.Crop || model("Crop", CropSchema);

export default Crop;