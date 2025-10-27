import { Router } from 'express';
import { alumnoController } from './alumno.controller.js';
import { body, param } from "express-validator";
import { createAlumno } from './schema/alumno.schema.js';
import { validate } from '../../middlewares/validator.middleware.js';

const alumnoRouter = Router();

alumnoRouter.post('/alumno', validate(createAlumno), alumnoController.create)

alumnoRouter.get(
  "/alumno/:id/tarea",
  [
    authMiddleware,
    param("id", "El ID debe ser numérico").isInt(),
    validate,
  ],
  alumnoController.tarea
);

alumnoRouter.get("/alumno", authMiddleware, alumnoController.getAll);

export default alumnoRouter;