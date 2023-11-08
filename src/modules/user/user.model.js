import { model, Schema } from "mongoose"

export const UserSchema = Schema(
  {
    username: { type: "String", required: true },
    password: { type: "String", required: true },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    socket_id: String
  },
  { timestamps: true }
)

export const User = model("User", UserSchema)
