import { model, Schema, Types } from "mongoose";

export const MessageSchema = new Schema(
  {
    user: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    to: { type: "String", required: true },
    message: { type: "String", required: true },
    from: { type: "String", required: true },
    // image: { type: "String" },
  },
  { timestamps: true }
);

export const Message = model("Message", MessageSchema);
