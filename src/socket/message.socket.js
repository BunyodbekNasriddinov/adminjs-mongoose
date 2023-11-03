import { Message } from "../modules/message/message.model.js";
import { User } from "../modules/user/user.model.js";
import jwt from "../utils/jwt.js";

export default (io, socket) => {
  socket.on("new-message", ({ to, message, from }) => {
    try {
      // to, message, from
      const receiverUser = User.findById(to);
      const senderUser = User.findById(from);
      if (!receiverUser || !senderUser) {
        throw new Error("User not found");
      }
      const newMessage = Message.create({ to, message, from });
      io.to(newMessage.to?.senderUser._id).emit("send-message", newMessage);
    } catch (error) {
      throw new Error(error.message);
    }
  });
};
