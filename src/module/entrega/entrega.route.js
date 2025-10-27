import { Router } from 'express';
import { entregaController } from './entrega.controller.js'; 
import { createEntrega } from './schema/entrega.schema.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validator.middleware.js';
import { isAlumno } from '../../middlewares/authorize.middleware.js';

const entregaRoutes = Router();

// Metodos POST
entregaRoutes.post('/alumno/:id/entregar', authMiddleware, isAlumno, validate(createEntrega), entregaController.create)

export default entregaRoutes; 