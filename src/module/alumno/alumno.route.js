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
 * @route POST /alumno/register
 * @desc Registrar nuevo alumno
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
  alumnoController.register
);

/**
 * @route POST /alumno/login
 * @desc Iniciar sesión de alumno
 * @access Público
 */
router.post(
  "/login",
  [
    body("username", "El nombre de usuario es obligatorio").trim().notEmpty(),
    body("password", "La contraseña es obligatoria").trim().notEmpty(),
    validarCampos,
  ],
  alumnoController.login
);

/**
 * @route GET /alumno
 * @desc Listar todos los alumnos
 * @access Privado (solo autenticados)
 */
router.get("/", verificarToken, alumnoController.getAll);

/**
 * @route GET /alumno/:id/tarea
 * @desc Consultar tareas del alumno por su ID
 * @access Privado
 */
router.get(
  "/:id/tarea",
  [
    verificarToken,
    param("id", "El ID debe ser numérico").isInt(),
    validarCampos,
  ],
  alumnoController.tarea
);

export default router;
