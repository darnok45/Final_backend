import { Router } from 'express';
import { profesorController } from './profesor.controller.js';
import { createProfesor } from './schema/profesor.schema.js';
import { validate } from '../../middlewares/validator.middleware.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const profesorRoutes = Router();

// Metodos GET
profesorRoutes.get('/profesor', authMiddleware, profesorController.findAll) // Traer todos los profesores
profesorRoutes.get('/profesor/:id', authMiddleware, profesorController.findOne) // Traer un profesor


// Metodos POST
profesorRoutes.post('/profesor', validate(createProfesor), profesorController.create) // Crear un profesor y su usuario

export default profesorRoutes; 