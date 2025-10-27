// ======================================================
// Importación de dependencias principales
// ======================================================
import { Router } from "express";
import { body, param } from "express-validator";
import { alumnoController } from "./alumno.controller.js";
import { validarCampos } from "../../middlewares/validator.middleware.js";
import { verificarToken } from "../../middlewares/auth.middleware.js";

const router = Router();

/* ======================================================
   RUTAS DE ALUMNO CON VALIDACIÓN Y AUTENTICACIÓN JWT
   ====================================================== */
/**
/**
 * @route GET /alumno
 * @desc Listar todos los alumnos
 * @access Privado (solo autenticados)
 */
router.get("/alumno", verificarToken, alumnoController.getAll);

/**
 * @route GET /alumno/:id/tarea
 * @desc Consultar tareas del alumno por su ID
 * @access Privado
 */
router.get(
  "/alumno/:id/tarea",
  [
    verificarToken,
    param("id", "El ID debe ser numérico").isInt(),
    validarCampos,
  ],
  alumnoController.tarea
);

export default router;
