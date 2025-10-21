import { Router } from 'express';
import { AlumnoController } from './alumno.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();
const controller = new AlumnoController();

router.post('/matricular', authMiddleware, (req, res) => controller.matricularAlumno(req, res));

export default router;