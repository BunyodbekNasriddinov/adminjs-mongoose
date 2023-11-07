import userSocket from "./user.socket.js"
import messageSocket from "./message.socket.js"
import notificationSocket from "./notification.socket.js"

export const onlineUsers = []

export default (io) =>
{
  io.on("connection", (socket) =>
  {
    console.log(socket.id)
    onlineUsers.push(socket.id)
    userSocket(io, socket)
    messageSocket(io, socket)
    notificationSocket(io, socket)
  })
}
