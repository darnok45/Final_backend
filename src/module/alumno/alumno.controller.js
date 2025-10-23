import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';
import * as bcrypt from 'bcrypt';

const userRepo = AppDatasource.getRepository('User')
const alumnoRepo = AppDatasource.getRepository('Alumno');

const create = async (req = request, res = response) => {
  const { nombre, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await userRepo.save({ nombre, email, password: hashPassword });

    const newAlumno = await alumnoRepo.save({ id: newUser.id });

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
    res.status(400).json({ ok: false, error, msg: 'Error' })
  }
}

export const alumnoController = {
  create
}