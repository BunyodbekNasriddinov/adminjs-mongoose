import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.get("/all", userController.getAllUsers);

export default userRouter;
