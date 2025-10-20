import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validator.middleware.js";
import { createUser } from "./schema/user.schema.js";

const userRouter = Router();

userRouter.post('/user', validate(createUser), userController.register)

export default userRouter;