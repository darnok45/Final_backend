import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';
import * as bcrypt from 'bcrypt';

const userRepo = AppDatasource.getRepository('User')
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
    res.status(400).json({ ok: false, error, msg: 'Error' })
  }
}



export const profesorController = {
  create
}