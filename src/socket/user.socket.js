import { User } from "../modules/user/user.model.js";
import jwt from "../utils/jwt.js";

export default async (io, socket) => {
  try {
  // const { token } = socket.handshake.auth;
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // if (!token) {
    //   throw new Error("Token is required");
    // }

    // if (!decoded.id) {
    //   throw new Error("Token invalid");
    // }

    const users = await User.find().populate({ path: "messages" });

    socket.on("ok", (data) => console.log(data));

    // all users get
    io.to(socket.id).emit("get-users", users);

    socket.on("get-messages-by-id", (id) => {
      const user = User.findById(id).populate({ path: "messages" });
      io.to(id).emit("get-messages-by-id", user);
    });

    // new user add
    socket.on("user-register", async (data) => {
      console.log("new user", data);
      const newUser = await User.create(data);
      await newUser.save();

      console.log("new user added", newUser);

      const token = jwt.sign({ id: newUser._id });

      io.to(socket.id).emit("new-user-add", {
        ...newUser,
        token,
        status: 201,
        message: "user created",
      });
      console.log(newUser);

      // user login
      socket.on("user-login", async (id) => {
        const existUser = await User.findById(Number(id));

        if (!existUser) {
          throw new Error("User not found");
        }

        const token = jwt.sign(existUser._id);
        io.to(socket.id).emit("user-login", {
          user: existUser,
          token,
          status: 200,
          message: "successfully login",
        });
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};
