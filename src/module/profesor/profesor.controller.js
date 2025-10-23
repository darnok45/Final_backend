import { request, response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../database/data-source.js";
import { Usuario } from "../../entities/Usuario.js";
import { Materia } from "../../entities/Materia.js";
import { Tarea } from "../../entities/Tarea.js";
import { envs } from "../../configuration/envs.js";

// ========================
// Registrar profesor
// ========================
const register = async (req = request, res = response) => {
  const { username, password, nombre, apellido } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ ok: false, msg: "Faltan datos obligatorios" });
    }

    const usuarioRepo = AppDataSource.getRepository(Usuario);

    const existing = await usuarioRepo.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ ok: false, msg: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const nuevoProfesor = usuarioRepo.create({
      username,
      password: hashedPassword,
      nombre,
      apellido,
      rol: "profesor",
    });

    await usuarioRepo.save(nuevoProfesor);

    res.status(201).json({
      ok: true,
      msg: "Profesor registrado correctamente",
      profesor: { id: nuevoProfesor.id, username: nuevoProfesor.username },
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
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    const user = await usuarioRepo.findOne({ where: { username, rol: "profesor" } });

    if (!user) {
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ ok: false, msg: "Contraseña incorrecta" });
    }

    const payload = { id: user.id, username: user.username, rol: user.rol };
    const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({
      ok: true,
      msg: "Login exitoso",
      metadata: {
        user: { id: user.id, username: user.username, rol: user.rol },
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
    const materiaRepo = AppDataSource.getRepository(Materia);

    const materias = await materiaRepo.find({
      where: { profesor: { id: id } },
      relations: ["profesor"],
    });

    res.status(200).json({
      ok: true,
      msg: "Materias obtenidas correctamente",
      materias,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error al obtener materias", error });
  }
};

// ========================
// Crear tarea
// ========================
const crearTarea = async (req = request, res = response) => {
  const { id, id2 } = req.params; // profesorID y materiaID
  const { titulo, descripcion } = req.body;

  try {
    const materiaRepo = AppDataSource.getRepository(Materia);
    const tareaRepo = AppDataSource.getRepository(Tarea);
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    const profesor = await usuarioRepo.findOne({ where: { id, rol: "profesor" } });
    const materia = await materiaRepo.findOne({
      where: { id: id2, profesor: { id } },
    });

    if (!materia) {
      return res.status(403).json({
        ok: false,
        msg: "Esa materia no pertenece a este profesor",
      });
    }

    const nuevaTarea = tareaRepo.create({
      titulo,
      descripcion,
      materia,
      profesor,
    });

    await tareaRepo.save(nuevaTarea);

    res.status(201).json({
      ok: true,
      msg: "Tarea creada correctamente",
      tarea: nuevaTarea,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error al crear tarea", error });
  }
};

export const profesorController = {
  register,
  login,
  verMaterias,
  crearTarea,
};