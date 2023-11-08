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
      console.log("-----------------------------------", to, from, message)
      const receiverUser = User.findById(to)
      const senderUser = User.findById(from)
      // console.log("users", receiverUser, senderUser, message, to, from)
      if (!receiverUser || !senderUser)
      {
        return new Error("User not found")
      }

      if (!message) throw new Error('Message required')

      const updateUser = await User.findOneAndUpdate({ _id: from }, { socket_id: socket.id })

      const newMessage = await Message.create({
        user: from,
        from: from,
        message: message,
        to: to,
      })
      newMessage.save()

      // const existOnlineUser = onlineUsers.includes(socket.id)
      const userSendMessages = await Message.find({ from }).exec()
      const userReceiverMessages = await Message.find({ from: to }).exec()

      // console.log(newMessage);
      // console.log('user messages', userMessages)

      io.to(socket.id).emit("send-message", newMessage)
      io.to(socket.id).emit("user-messages", { userMessages: { userSendMessages, userReceiverMessages } })



    } catch (error)
    {
      throw new Error(error.message)
    }

  })

  socket.on('user-messages', async (data) =>
  {
    try
    {
      const { from, to } = data
      // console.log('user data', data)
      if (!from || !to) return new Error('from and to required')

      const userSendMessages = await Message.find({ from, to }).exec()
      const userReceiverMessages = await Message.find({ from: to, from: to }).exec()
      // const userMsg = await User.find({ from }).populate({ path: 'messages' }).exec()
      const userMsg = await User.findOne({ from, to }).populate('messages').exec()

      console.log('userMessages', userMsg)

      io.to(socket.id).emit("user-messages", { userMessages: { userSendMessages, userReceiverMessages } })
    } catch (error)
    {
      throw new Error(error)
    }
  })
}
