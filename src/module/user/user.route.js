import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validator.middleware.js";
import { createUser } from "./schema/user.schema.js";
import authMiddleware from "../../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.post('/user', validate(createUser), userController.register) // Metodo para crear alumnos y profesores
userRouter.post('/alumno', validate(createUser), userController.register_alumno) // Metodo para registrar alumnos
userRouter.post('/profesor', validate(createUser), userController.register_profesor) // Metodo para registrar un profesor
userRouter.post('/login', userController.login) // Metodo para logearse
userRouter.get('/profesores', authMiddleware, userController.findAllProfesor)


export default userRouter;