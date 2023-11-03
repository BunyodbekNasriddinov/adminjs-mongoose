export default (io, socket) => {
  socket.on("new-message", async ({ to, message, from }) => {
    try {
      
    } catch (error) {
      throw new Error(error.message);
    }
  });
};
