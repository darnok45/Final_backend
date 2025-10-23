import { Router } from 'express';
import { profesorController } from './profesor.controller.js';
import { createProfesor } from './schema/profesor.schema.js';
import { validate } from '../../middlewares/validator.middleware.js';

const profesorRoutes = Router();

profesorRoutes.post('/profesor', validate(createProfesor), profesorController.create)

export default profesorRoutes; 