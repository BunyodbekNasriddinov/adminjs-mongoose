import userSocket from "./user.socket.js";
import messageSocket from "./message.socket.js";
import notificationSocket from "./notification.socket.js";

export default (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    userSocket(io, socket);
    messageSocket(io, socket);
    notificationSocket(io, socket);
  });
};
