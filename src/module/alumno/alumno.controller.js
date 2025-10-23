import { request, response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../database/data-source.js";
import { Usuario } from "../../entities/Usuario.js";
import { Tarea } from "../../entities/Tarea.js";
import { envs } from "../../configuration/envs.js";

// ========================
// Registrar alumno
// ========================
const register = async (req = request, res = response) => {
  const { username, password, nombre, apellido } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ ok: false, msg: "Faltan datos obligatorios" });
    }

    const usuarioRepo = AppDataSource.getRepository(Usuario);

    // Verificar si ya existe el usuario
    const existing = await usuarioRepo.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ ok: false, msg: "El usuario ya existe" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear e insertar el nuevo alumno
    const nuevoAlumno = usuarioRepo.create({
      username,
      password: hashedPassword,
      nombre,
      apellido,
      rol: "alumno",
    });

    await usuarioRepo.save(nuevoAlumno);

    res.status(201).json({
      ok: true,
      msg: "Alumno registrado correctamente",
      alumno: {
        id: nuevoAlumno.id,
        username: nuevoAlumno.username,
        nombre: nuevoAlumno.nombre,
        apellido: nuevoAlumno.apellido,
      },
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
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    const user = await usuarioRepo.findOne({ where: { username, rol: "alumno" } });

    if (!user) {
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ ok: false, msg: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const payload = { id: user.id, username: user.username, rol: user.rol };
    const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({
      ok: true,
      msg: "Login exitoso",
      metadata: {
        user: {
          id: user.id,
          username: user.username,
          nombre: user.nombre,
          apellido: user.apellido,
          rol: user.rol,
        },
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
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    const alumnos = await usuarioRepo.find({
      where: { rol: "alumno" },
      select: ["id", "username", "nombre", "apellido", "rol"],
    });

    res.status(200).json({
      ok: true,
      msg: "Lista de alumnos obtenida correctamente",
      alumnos,
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
    const tareaRepo = AppDataSource.getRepository(Tarea);

    // Buscar las tareas asociadas al alumno
    const tareas = await tareaRepo.find({
      where: { profesor: { id } },
      relations: ["materia", "profesor"],
    });

    res.status(200).json({
      ok: true,
      msg: "Tareas del alumno obtenidas correctamente",
      tareas,
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
