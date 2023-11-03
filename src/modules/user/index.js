import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.get("/all", userController.getAllUsers);
userRouter.post("/register", userController.userRegister);
userRouter.get("/info", userController.userGetMessages);

export default userRouter;
