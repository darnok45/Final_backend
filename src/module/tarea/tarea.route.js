import { Router } from 'express';
import { tareaController } from './tarea.controller.js'; 
import { createTarea } from './schema/tarea.schema.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validator.middleware.js';

const tareaRoutes = Router();

// Metodos POST
tareaRoutes.post('/profesor/:id/materia/:id2/tarea', authMiddleware, validate(createTarea), tareaController.create)

export default tareaRoutes; 