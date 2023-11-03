import { User } from "./user.model.js";
import jwt from "../../utils/jwt.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate({ path: "messages" });
    res.status(200).json({ message: "ok", users: users });
  } catch (error) {
    throw new Error(error.message);
  }
};

const userRegister = async (req, res) => {
  console.log("new user", req.body);
  const newUser = await User.create(req.body);
  await newUser.save();

  const token = jwt.sign({ id: newUser._id });

  newUser.password = null;

  res.status(201).json({
    status: 201,
    message: "user successfully created",
    data: newUser,
    token,
  });
};

const userGetMessages = async (req, res) => {
  const { token } = req.headers;
  try {
    if (!token) {
      throw new Error("Token id required");
    }

    const decoded = jwt.verify(token);
    console.log(decoded);
    if (!decoded.id) {
      throw new Error("Token invalid");
    }

    const user = await User.findById(decoded.id).populate({
      path: "messages",
    });

    res.status(200).json({
      user,
      status: 200,
      message: "user and messages",
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default { getAllUsers, userRegister, userGetMessages };
