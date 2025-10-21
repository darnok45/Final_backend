import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validator.middleware.js";
import { createUser } from "./schema/user.schema.js";
import authMiddleware from "../../middlewares/auth.middleware.js";


const userRouter = Router();

// User:
userRouter.post('/user', validate(createUser), userController.register) // Metodo para crear alumnos y profesores
userRouter.post('/login', userController.login) // Metodo para logearse

// Alumno:
userRouter.post('/alumno', validate(createUser), userController.register_alumno) // Metodo para registrar alumnos

// Profesor:
userRouter.post('/profesor', validate(createUser), userController.register_profesor) // Metodo para registrar un profesor
userRouter.get('/profesor', authMiddleware, userController.findAllProfesor) // Metodo para traer a todos los profesores

userRouter.get('/profesor/:id', authMiddleware, userController.findOneProfesor) // Metodo para traer un profesor
// userRouter.get('/profesor/:id/materia/:id2/alumnos')


export default userRouter;