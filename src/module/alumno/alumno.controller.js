import { request, response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getConnection } from "../../database/database.js";
import { envs } from "../../configuration/envs.js"; // asegúrate de tener JWT_SECRET en tu .env

// ========================
// Registrar alumno
// ========================
const register = async (req = request, res = response) => {
  const { username, password, nombre, apellido } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ ok: false, msg: "Faltan datos obligatorios" });
    }

    const connection = await getConnection();

    // Verificar si el usuario ya existe
    const [existing] = await connection.query(
      "SELECT * FROM usuario WHERE username = ?",
      [username]
    );

    if (existing.length > 0) {
      return res.status(400).json({ ok: false, msg: "El usuario ya existe" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insertar usuario con rol "alumno"
    const [result] = await connection.query(
      "INSERT INTO usuario (username, password, nombre, apellido, rol) VALUES (?, ?, ?, ?, 'alumno')",
      [username, hashedPassword, nombre, apellido]
    );

    res.status(201).json({
      ok: true,
      msg: "Alumno registrado correctamente",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error al registrar alumno", error });
  }
};

// ========================
// Login alumno
// ========================
const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE username = ? AND rol = 'alumno'",
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
// Obtener todos los alumnos
// ========================
const getAll = async (req = request, res = response) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      'SELECT id, username, nombre, apellido, rol FROM usuario WHERE rol = "alumno"'
    );

    res.status(200).json({
      ok: true,
      msg: "Lista de alumnos obtenida",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error al obtener alumnos", error });
  }
};

// ========================
// Obtener tareas de un alumno
// ========================
const tarea = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT * FROM tarea WHERE usuarioID = ?",
      [id]
    );

    res.status(200).json({
      ok: true,
      msg: "Tareas del alumno obtenidas",
      tareas: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener las tareas del alumno",
      error,
    });
  }
};

// ========================
// Exportar controlador
// ========================
export const alumnoController = {
  register,
  login,
  getAll,
  tarea,
};
