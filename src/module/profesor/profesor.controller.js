import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';
import * as bcrypt from 'bcrypt';

// Repositorio de User y Profesor
const userRepo = AppDatasource.getRepository('User');
const profesorRepo = AppDatasource.getRepository('Profesor');

// Función para crear un profesor y su usuario
const create = async (req = request, res = response) => {
  const { nombre, email, password } = req.body; // Datos recibidos en el body

  try {
    // Hasheo de contraseña antes de guardar en la base de datos
    const hashPassword = await bcrypt.hash(password, 12);

    // Crea el usuario en la BD
    const newUser = await userRepo.save({ nombre, email, password: hashPassword });

    // Crea el profesor con la relación al usuario recien creado
    const newProfesor = await profesorRepo.save({ id: newUser.id });

    // Si todo sale bien devuelve 201 
    res.status(201).json({
      ok: true,
      msg: 'Profesor creado con exito',
      data: {
        id: newProfesor.id,
        nombre: newUser.nombre,
        email: newUser.email
      }
    });
  }
  catch (error) {
    // Si falla devuelve status 400
    res.status(400).json({ ok: false, error, msg: 'Error' });
  }
}

// Función para ver los profesores
const findAll = async (req = request, res = response) => {
  // Información del usuario autenticado
  console.log(req.user)

  try {
    // Carga los datos del usuario con relación a la entidad profesor
    const profesores = await profesorRepo.find({
      relations: {
        usuario: true
      }
    });

    // Se le da formato a la información
    const data = profesores.map(p => ({
      id: p.id,
      nombre: p.usuario.nombre,
      email: p.usuario.email,
      rol: 'Profesor'
    }));

    // Devuelve 201
    res.status(201).json({ ok: true, data, msg: 'Profesores obtenidos con exito' })
  }
  catch (error) {
    // Si ocurre un error devuelve un status 400
    res.status(400).json({ ok: false, error, msg: 'Error' });
  }
}

// Obtener profesor por ID
const findOne = async (req = request, res = response) => {
  const idParam = req.params.id; // Obtenemos el ID por parametro

  console.log(req.user) // Información del usuario autenticado

  try {
    // Se busca el profesor por su id
    const profesor = await profesorRepo.findOne({
      where: {
        id: idParam,
      },
      relations: {
        usuario: true
      }
    })

    // Si no se encuentra el profesor retorna un status 404
    if (!profesor) {
      return res.status(404).json({ ok: false, msg: "Profesor no encontrado" });
    }

    // Se guarda la información del profesor que sera mostrada
    const data = {
      id: profesor.id,
      nombre: profesor.usuario.nombre,
      email: profesor.usuario.email,
      rol: 'Profesor'
    };

    // Devuelve 200 y muestra al profesor
    return res.status(200).json({ ok: true, message: 'Approved', data: data })
  }
  catch (error) {
    // En caso de error se devuelve el error y un status 500
    console.error(error);
    res.status(500).json({ ok: false, error, msg: 'Server error' })
  }
}


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

export const profesorController = {
  create,
  findAll,
  findOne,
  verMaterias
}