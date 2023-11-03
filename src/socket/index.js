import userSocket from "./user.socket.js";
import messageSocket from "./message.socket.js";

export default (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    userSocket(io, socket);
    messageSocket(io, socket);
  });
};
