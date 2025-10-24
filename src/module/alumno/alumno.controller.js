import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';
import * as bcrypt from 'bcrypt';

// Repositorio de User y Alumno
const userRepo = AppDatasource.getRepository('User')
const alumnoRepo = AppDatasource.getRepository('Alumno');

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

export const alumnoController = {
  create
}