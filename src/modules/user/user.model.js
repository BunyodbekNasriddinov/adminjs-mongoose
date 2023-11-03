import { model, Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    username: { type: "String", required: true },
    email: { type: "String", required: false },
    password: { type: "String", required: true },
    // image: { type: "String" },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
