import { request, response } from "express";
import jwt from "jsonwebtoken";
import AppDatasource from '../../providers/data.source.js';
import * as bcrypt from 'bcrypt';
import { matricularAlumnoDTO } from './schema/alumno.schema.js'; 
import { AppDataSource } from "../../database/data-source.js";
import { Usuario } from "../../entities/Usuario.js";
import { Tarea } from "../../entities/Tarea.js";
import { envs } from "../../configuration/envs.js";

// Repositorio de User y Alumno
const userRepo = AppDatasource.getRepository('User')
const alumnoRepo = AppDatasource.getRepository('Alumno');
const materiaRepo = AppDatasource.getRepository('Materia');

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


const create = async (req = request, res = response) => {
  const { nombre, email, password } = req.body; // Datos recibidos en el body

  try {
    // Se hashea la contraseña antes de guardar en la BD
    const hashPassword = await bcrypt.hash(password, 12);

    // Creación del usuario para alumno
    const newUser = await userRepo.save({ nombre, email, password: hashPassword });

    // Creación del alumno con la relación del usuario recien creado
    const newAlumno = await alumnoRepo.save({ id: newUser.id });

    // Status 201 con información del nuevo alumno
    res.status(201).json({
      ok: true,
      msg: 'Alumno creado con exito',
      data: {
        id: newAlumno.id,
        nombre: newUser.nombre,
        email: newUser.email
      }
    });
  }
  catch (error) {
    // En caso de errorr status 400
    res.status(400).json({ ok: false, error, msg: 'Error' })
  }
}


// ***** LÓGICA DE MATRICULAR ALUMNO (Anteriormente sin función) *****
const matricularAlumno = async (req = request, res = response) => {
    // 1. Validación de DTO
    const { error, value } = matricularAlumnoDTO.validate(req.body);
    if (error) return res.status(400).json({ ok: false, msg: error.message });

    const { alumnoId, materiaId } = value;
    
    try {
        // 2. Búsqueda de entidades
        const alumno = await alumnoRepo.findOne({ where: { id: alumnoId }, relations: ['materias'] });
        const materia = await materiaRepo.findOne({ where: { id: materiaId } });

        // 3. Validación de existencia
        if (!alumno || !materia) {
            return res.status(404).json({ ok: false, msg: 'Alumno o materia no encontrada' });
        }

        // 4. Lógica de matriculación (TypeORM)
        alumno.materias.push(materia);
        await alumnoRepo.save(alumno);

        // 5. Respuesta exitosa
        res.status(201).json({
            ok: true,
            msg: `Alumno matriculado en ${materia.nombre}`,
        });

    } catch (error) {
        console.error(error); // Usar 'error' en lugar de 'err'
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
}
// ***** FIN DE LÓGICA DE MATRICULAR ALUMNO *****

export const alumnoController = {
  create,
  getAll,
  tarea,
  matricularAlumno
}
