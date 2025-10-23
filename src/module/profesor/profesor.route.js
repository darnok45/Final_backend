// ======================================================
// Importaciones principales
// ======================================================
import { Router } from "express";
import { body, param } from "express-validator";
import { validarCampos } from "../../middlewares/validator.middleware.js";
import { verificarToken } from "../../middlewares/auth.middleware.js";
import { profesorController } from "./profesor.controller.js";

const router = Router();

/* ======================================================
   RUTAS DE PROFESOR CON VALIDACIÓN Y AUTENTICACIÓN JWT
   ====================================================== */

/**
 * @route POST /profesor/register
 * @desc Registrar nuevo profesor
 * @access Público
 */
router.post(
  "/register",
  [
    body("username", "El nombre de usuario es obligatorio").trim().notEmpty(),
    body("password", "La contraseña debe tener al menos 6 caracteres")
      .isLength({ min: 6 }),
    body("nombre", "El nombre es obligatorio").optional().trim().escape(),
    body("apellido", "El apellido es obligatorio").optional().trim().escape(),
    validarCampos,
  ],
  profesorController.register
);

/**
 * @route POST /profesor/login
 * @desc Iniciar sesión de profesor
 * @access Público
 */
router.post(
  "/login",
  [
    body("username", "El nombre de usuario es obligatorio").trim().notEmpty(),
    body("password", "La contraseña es obligatoria").trim().notEmpty(),
    validarCampos,
  ],
  profesorController.login
);

/**
 * @route GET /profesor/:id/materias
 * @desc Ver materias asignadas al profesor
 * @access Privado
 */
router.get(
  "/:id/materias",
  [
    verificarToken,
    param("id", "El ID debe ser numérico").isInt(),
    validarCampos,
  ],
  profesorController.verMaterias
);

/**
 * @route POST /profesor/:id/materia/:id2/tarea
 * @desc Crear tarea en una materia específica
 * @access Privado
 */
router.post(
  "/:id/materia/:id2/tarea",
  [
    verificarToken,
    param("id", "El ID del profesor debe ser numérico").isInt(),
    param("id2", "El ID de la materia debe ser numérico").isInt(),
    body("titulo", "El título es obligatorio").trim().notEmpty().escape(),
    body("descripcion", "La descripción es obligatoria").trim().notEmpty().escape(),
    validarCampos,
  ],
  profesorController.crearTarea
);

export default router;
