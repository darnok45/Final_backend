import Joi from 'joi';

export const createAlumno = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})