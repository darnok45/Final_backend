import { Router } from 'express';
import { profesorController } from './profesor.controller.js';
import { createProfesor } from './schema/profesor.schema.js';
import { validate } from '../../middlewares/validator.middleware.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const profesorRoutes = Router();

// Metodos GET
profesorRoutes.get('/profesor', authMiddleware, profesorController.findAll) // Traer todos los profesores



// Metodos POST
profesorRoutes.post('/profesor', validate(createProfesor), profesorController.create)

export default profesorRoutes; 