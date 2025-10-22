import { Router } from 'express';
import { ProfesorController } from './profesor.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();
const controller = new ProfesorController();

// Rutas protegidas
router.get('/:id/entregar', authMiddleware, (req, res) => controller.verEntregas(req, res));
router.post('/:id/matricula', authMiddleware, (req, res) => controller.matricularAlumno(req, res));

export default router; 