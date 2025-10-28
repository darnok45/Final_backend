import { Router } from 'express';
import { alumnoController } from './alumno.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', alumnoController.create);
router.post('/matricula', alumnoController.matricularAlumno);

export default router;