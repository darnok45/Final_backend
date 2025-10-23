import { Router } from 'express';
import { alumnoController } from './alumno.controller.js';
import { createAlumno } from './schema/alumno.schema.js';
import { validate } from '../../middlewares/validator.middleware.js';

const alumnoRouter = Router();

alumnoRouter.post('/alumno', validate(createAlumno), alumnoController.create)

export default alumnoRouter;