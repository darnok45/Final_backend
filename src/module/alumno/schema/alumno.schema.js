import Joi from 'joi';

export const createAlumno = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

/*
    DTO para validar la creación de un alumno
    Define las reglas que debe cumplir el body de la solicitud
*/