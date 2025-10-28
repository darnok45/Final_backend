import { Router } from 'express';
import { profesorController } from './profesor.controller.js';
import { createProfesor } from './schema/profesor.schema.js';
import { validate } from '../../middlewares/validator.middleware.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { isProfesor } from '../../middlewares/authorize.middleware.js';

const profesorRoutes = Router();

// Metodos GET
profesorRoutes.get('/profesor', authMiddleware, isProfesor, profesorController.findAll) // Traer todos los profesores
profesorRoutes.get('/profesor/:id', authMiddleware, isProfesor, profesorController.findOne) // Traer un profesor
profesorRoutes.get("/profesor/:id/materias", authMiddleware, isProfesor, profesorController.verMaterias);
profesorRoutes.get('/:id/entregar', authMiddleware, profesorController.verEntregas);

// Metodos POST
profesorRoutes.post('/profesor', validate(createProfesor), profesorController.create) // Crear un profesor y su usuario
profesorRoutes.post('/:id/matricula', authMiddleware, profesorController.matricularAlumno);


export default profesorRoutes; 