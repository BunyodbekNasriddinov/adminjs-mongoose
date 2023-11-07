import { Message } from "../modules/message/message.model.js"
import { User } from "../modules/user/user.model.js"
import { onlineUsers } from "./index.js"

export default (io, socket) =>
{
  socket.on("new-message", async ({ to, message, from }) =>
  {
    try
    {
      if (!to || !from) return new Error("To and from required")
      // to, message, from
      console.log("-[[----------------------------------", to, from, message)
      const receiverUser = User.findById(to)
      const senderUser = User.findById(from)
      console.log("users", receiverUser, senderUser, message, to, from)
      if (!receiverUser || !senderUser)
      {
        return new Error("User not found")
      }

      const newMessage = await Message.create({
        from: from,
        message: message,
        to: to,
      })
      newMessage.save()

      const existOnlineUser = onlineUsers.includes(socket.id)

      // console.log(newMessage);
      console.log(existOnlineUser, 'online user')
      io.to(socket.id).emit("send-message", newMessage)
    } catch (error)
    {
      throw new Error(error.message)
    }

  })
}
