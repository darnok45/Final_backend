import Joi from 'joi';

export const matricularAlumnoDTO = Joi.object({
  alumnoId: Joi.number().integer().required(),
  materiaId: Joi.number().integer().required(),
});