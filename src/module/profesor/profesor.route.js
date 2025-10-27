import { Router } from 'express';
import { profesorController } from './profesor.controller.js';
import { createProfesor } from './schema/profesor.schema.js';
import { validate } from '../../middlewares/validator.middleware.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { isProfesor } from '../../middlewares/authorize.middleware.js';
import { body, param } from "express-validator";

const profesorRoutes = Router();

// Metodos GET
profesorRoutes.get('/profesor', authMiddleware, isProfesor, profesorController.findAll) // Traer todos los profesores
profesorRoutes.get('/profesor/:id', authMiddleware, isProfesor, profesorController.findOne) // Traer un profesor
profesorRoutes.get(
  "/profesor/:id/materias",
  [
    verificarToken,
    isProfesor
    param("id", "El ID debe ser numérico").isInt(),
    validarCampos,
  ],
  profesorController.verMaterias
);


// Metodos POST
profesorRoutes.post('/profesor', validate(createProfesor), profesorController.create) // Crear un profesor y su usuario
profesorRoutes.post(
  "/profesor/:id/materia/:id2/tarea",
  [
    authMiddleware,
    isProfesor,
    param("id", "El ID del profesor debe ser numérico").isInt(),
    param("id2", "El ID de la materia debe ser numérico").isInt(),
    body("titulo", "El título es obligatorio").trim().notEmpty().escape(),
    body("descripcion", "La descripción es obligatoria").trim().notEmpty().escape(),
    validate,
  ],
  profesorController.crearTarea
);

export default profesorRoutes; 