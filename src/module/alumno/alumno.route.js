import { Router } from 'express';
import { alumnoController } from './alumno.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { body, param } from "express-validator";
import { createAlumno } from './schema/alumno.schema.js';
import { validate } from '../../middlewares/validator.middleware.js';

const alumnoRouter = Router();

// GET
alumnoRouter.get("/alumno", authMiddleware, alumnoController.getAll);
alumnoRouter.get(
  "/alumno/:id/tarea",
  [
    authMiddleware,
    param("id", "El ID debe ser numérico").isInt(),
    validate,
  ],
  alumnoController.tarea
);

//POST
alumnoRouter.post('/alumno', validate(createAlumno), alumnoController.create)
alumnoRouter.post('/matricula', alumnoController.matricularAlumno);


export default alumnoRouter;