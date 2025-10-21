// Importamos dependencias principales
import { Router } from "express";
import { body, param } from "express-validator"; // ✅ para validaciones
import { alumnoController } from "./alumno.controller.js";
import { validarCampos } from "../../middlewares/validator.middleware.js";
import { verificarToken } from "../../middlewares/auth.middleware.js";

const router = Router();

/* ======================================================
   RUTAS DE ALUMNO CON VALIDACIÓN Y AUTENTICACIÓN JWT
   ====================================================== */

/**
 * @route GET /alumno
 * @desc Listar todos los alumnos
 * @access Privado (solo usuarios autenticados)
 */
router.get(
  "/",
  verificarToken, // 🔒 Requiere token válido
  alumnoController.getAll
);

/**
 * @route GET /alumno/:id
 * @desc Obtener alumno por ID
 */
router.get(
  "/:id",
  [
    verificarToken,
    param("id", "El ID debe ser numérico").isInt(),
    validarCampos
  ],
  alumnoController.getId
);

/**
 * @route POST /alumno
 * @desc Crear alumno
 */
router.post(
  "/",
  [
    verificarToken,
    body("nombre", "El nombre es obligatorio").trim().notEmpty().escape(),
    body("email", "Debe ser un email válido").isEmail().normalizeEmail(),
    validarCampos
  ],
  alumnoController.create
);

/**
 * @route GET /alumno/:id/tarea
 * @desc Consultar tareas del alumno
 */
router.get(
  "/:id/tarea",
  [
    verificarToken,
    param("id", "El ID debe ser numérico").isInt(),
    validarCampos
  ],
  alumnoController.tarea
);

/**
 * @route POST /alumno/entregar
 * @desc Entregar tarea
 */
router.post(
  "/entregar",
  [
    verificarToken,
    body("tareaID", "El ID de tarea es obligatorio").isInt(),
    body("usuarioID", "El ID de usuario es obligatorio").isInt(),
    validarCampos
  ],
  alumnoController.entregarTarea
);

/**
 * @route POST /alumno/matricular
 * @desc Alumno se matricula en materia
 */
router.post(
  "/matricular",
  [
    verificarToken,
    body("usuarioID", "usuarioID es requerido y debe ser numérico").isInt(),
    body("materiaID", "materiaID es requerido y debe ser numérico").isInt(),
    validarCampos
  ],
  alumnoController.matricularMateria
);

/**
 * @route GET /alumno/:id/materias
 * @desc Ver materias matriculadas
 */
router.get(
  "/:id/materias",
  [
    verificarToken,
    param("id", "El ID debe ser numérico").isInt(),
    validarCampos
  ],
  alumnoController.verMateriaMatriculada
);

export default router