import { Router } from 'express';
import { profesorController } from './profesor.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

// Rutas protegidas (Usando el objeto importado directamente)
router.get('/:id/entregar', authMiddleware, profesorController.verEntregas);
router.post('/:id/matricula', authMiddleware, profesorController.matricularAlumno);

export default router;