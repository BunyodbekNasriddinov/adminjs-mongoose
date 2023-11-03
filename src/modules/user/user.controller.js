import { User } from "./user.model.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate({ path: "messages" });
    res.status(200).json({ message: "ok", users: users });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { getAllUsers };
