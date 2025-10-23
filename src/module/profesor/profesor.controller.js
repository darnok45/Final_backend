import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';
import * as bcrypt from 'bcrypt';

const userRepo = AppDatasource.getRepository('User');
const profesorRepo = AppDatasource.getRepository('Profesor');

// Función para crear un profesor y su usuario
const create = async (req = request, res = response) => {
  const { nombre, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await userRepo.save({ nombre, email, password: hashPassword });

    const newProfesor = await profesorRepo.save({ id: newUser.id });

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
    res.status(400).json({ ok: false, error, msg: 'Error' });
  }
}

// Función para ver los profesores
const findAll = async (req = request, res = response) => {
  console.log(req.user)

  try {
    const profesores = await profesorRepo.find({
      relations: {
        usuario: true
      }
    });

    const data = profesores.map(p => ({
      id: p.id,
      nombre: p.usuario.nombre,
      email: p.usuario.email,
      rol: 'Profesor'
    }));

    res.status(201).json({ ok: true, data, msg: 'Profesores obtenidos con exito' })
  }
  catch (error) {
    res.status(400).json({ ok: false, error, msg: 'Error' });
  }
}

const findOne = async (req = request, res = response) => {
  const idParam = req.params.id;

  console.log(req.user)

  try {
    const profesor = await profesorRepo.findOne({
      where: {
        id: idParam,
      },
      relations: {
        usuario: true
      }
    })

    if (!profesor) {
      return res.status(404).json({ ok: false, msg: "Profesor no encontrado" });
    }

    const data = {
      id: profesor.id,
      nombre: profesor.usuario.nombre,
      email: profesor.usuario.email,
      rol: 'Profesor'
    };

    return res.status(200).json({ ok: true, message: 'Approved', data: data })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error, msg: 'Server error' })
  }
}

export const profesorController = {
  create,
  findAll,
  findOne
}