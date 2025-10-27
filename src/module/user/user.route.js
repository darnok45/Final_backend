import { Router } from "express";
import { userController } from "./user.controller.js";

const userRouter = Router();

userRouter.post('/login', userController.login) // Metodo para logearse

export default userRouter;