import Joi from 'joi';

export const createProfesor = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})