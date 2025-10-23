import Joi from 'joi';

export const createMateria = Joi.object({
    nombre: Joi.string().required(),
    profesor_id: Joi.number().required() 
})