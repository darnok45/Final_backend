import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validator.middleware.js";
import { createUser } from "./schema/user.schema.js";


const userRouter = Router();

userRouter.post('/login', userController.login) // Metodo para logearse

export default userRouter;