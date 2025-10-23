import { Router } from 'express';
import { materiaController } from './materia.controller.js'; 
import { createMateria } from './schema/materia.schema.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validator.middleware.js';

const materiaRoutes = Router();

// Metodos POST
materiaRoutes.post('/materia', authMiddleware, validate(createMateria), materiaController.create)

export default materiaRoutes; 