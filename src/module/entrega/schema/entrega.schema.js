import Joi from 'joi';

export const createEntrega = Joi.object({
    tarea_id: Joi.number().required()
})