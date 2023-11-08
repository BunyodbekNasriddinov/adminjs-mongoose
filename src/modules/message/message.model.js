import { model, Schema, Types } from "mongoose"

export const MessageSchema = Schema(
  {
    user: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    message: { type: "String", required: true },
    // to: { type: "String", required: true },
    to: [
      {
        type: Types.ObjectId,
        ref: 'User'
      }
    ],
    from: [
      {
        type: Types.ObjectId,
        ref: 'User'
      }
    ],
    // from: { type: "String", required: true },
    // image: { type: "String" },
  },
  { timestamps: true }
)

export const Message = model("Message", MessageSchema)
