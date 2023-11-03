import { model, Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    username: { type: "String", required: true },
    password: { type: "String", required: true },
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
