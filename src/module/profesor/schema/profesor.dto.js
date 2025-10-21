import Joi from 'joi';

export const matricularAlumnoEnMateriaDTO = Joi.object({
  alumnoId: Joi.number().integer().required(),
  materiaId: Joi.number().integer().required(),
});