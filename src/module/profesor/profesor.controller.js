import { request, response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getConnection } from "../../database/database.js";
import { envs } from "../../configuration/envs.js"; // Asegúrate de tener JWT_SECRET

// ========================
// Registrar profesor
// ========================
const register = async (req = request, res = response) => {
  const { username, password, nombre, apellido } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ ok: false, msg: "Faltan datos obligatorios" });
    }

    const connection = await getConnection();

    // Verificar si ya existe
    const [existing] = await connection.query(
      "SELECT * FROM usuario WHERE username = ?",
      [username]
    );

    if (existing.length > 0) {
      return res.status(400).json({ ok: false, msg: "El usuario ya existe" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insertar usuario con rol profesor
    const [result] = await connection.query(
      "INSERT INTO usuario (username, password, nombre, apellido, rol) VALUES (?, ?, ?, ?, 'profesor')",
      [username, hashedPassword, nombre, apellido]
    );

    res.status(201).json({
      ok: true,
      msg: "Profesor registrado correctamente",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error al registrar profesor", error });
  }
};

// ========================
// Login profesor
// ========================
const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE username = ? AND rol = 'profesor'",
      [username]
    );

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ ok: false, msg: "Contraseña incorrecta" });
    }

    // Crear payload y token JWT
    const payload = { id: user.id, username: user.username, rol: user.rol };
    const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({
      ok: true,
      msg: "Login exitoso",
      metadata: {
        user: { ...user, password: "***" },
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error en el login", error });
  }
};

// ========================
// Ver materias del profesor
// ========================
const verMaterias = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT * FROM materia WHERE profesorID = ?",
      [id]
    );

    res.status(200).json({
      ok: true,
      msg: "Materias obtenidas correctamente",
      materias: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener materias del profesor",
      error,
    });
  }
};

// ========================
// Crear tarea de una materia
// ========================
const crearTarea = async (req = request, res = response) => {
  const { id, id2 } = req.params; // id = profesorID, id2 = materiaID
  const { titulo, descripcion } = req.body;

  try {
    const connection = await getConnection();

    // Validar que la materia pertenezca al profesor
    const [materia] = await connection.query(
      "SELECT * FROM materia WHERE id = ? AND profesorID = ?",
      [id2, id]
    );

    if (materia.length === 0) {
      return res.status(403).json({
        ok: false,
        msg: "Esa materia no pertenece a este profesor",
      });
    }

    // Crear tarea
    const [result] = await connection.query(
      "INSERT INTO tarea (titulo, descripcion, materiaID, profesorID) VALUES (?, ?, ?, ?)",
      [titulo, descripcion, id2, id]
    );

    res.status(201).json({
      ok: true,
      msg: "Tarea creada correctamente",
      idTarea: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear tarea",
      error,
    });
  }
};

// ========================
// Exportar controlador
// ========================
export const profesorController = {
  register,
  login,
  verMaterias,
  crearTarea,
};
