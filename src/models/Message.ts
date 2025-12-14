import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  sender: { type: String, required: true }, // Buyer Name
  senderMobile: { type: String, required: true },
  receiver: { type: String, default: "Seller" }, // Simplification
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = models.Message || model("Message", MessageSchema);
export default Message;