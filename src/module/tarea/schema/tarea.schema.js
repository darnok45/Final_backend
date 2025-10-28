import Joi from 'joi';

export const createTarea = Joi.object({
    titulo: Joi.string().required(),
    descripcion: Joi.string().required(),
    fechaEntrega: Joi.date().iso().required()
})
