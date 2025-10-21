import { Router } from "express";
import { param, body } from "express-validator";
import { validarCampos } from "../../middlewares/validator.middleware.js";
import { verificarToken } from "../../middlewares/auth.middleware.js";
import { profesorController } from "./profesor.controller.js";

const router = Router();

/**
 * GET /profesor/:id/materias → Ver materias de un profesor
 */
router.get(
  "/:id/materias",
  [
    verificarToken,
    param("id", "El ID debe ser numérico").isInt(),
    validarCampos
  ],
  profesorController.verMaterias
);

/**
 * POST /profesor/:id/materia/:id2/tarea → Crear tarea para una materia
 */
router.post(
  "/:id/materia/:id2/tarea",
  [
    verificarToken,
    param("id", "El ID del profesor debe ser numérico").isInt(),
    param("id2", "El ID de la materia debe ser numérico").isInt(),
    body("titulo", "El título es obligatorio").notEmpty().trim().escape(),
    body("descripcion", "La descripción es obligatoria").notEmpty().trim().escape(),
    validarCampos
  ],
  profesorController.crearTarea
);

export default router;
