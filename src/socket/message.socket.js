import { Message } from "../modules/message/message.model.js";
import { User } from "../modules/user/user.model.js";

export default (io, socket) => {
  socket.on("new-message", async ({ to, message, from }) => {
    try {
      // to, message, from
      const receiverUser = User.findById(to);
      const senderUser = User.findById(from);
      if (!receiverUser || !senderUser) {
        throw new Error("User not found");
      }
      const newMessage = await Message.create({ to, message, from });
      newMessage.save();

      console.log(newMessage);
      console.log(socket.id);
      io.to(socket.id).emit("send-message", newMessage);
    } catch (error) {
      throw new Error(error.message);
    }
  });
};
