import Joi from 'joi';

export const createEntrega = Joi.object({
    tarea_id: Joi.number().required()
})

/*
    DTO para validar la creación de una entrega
    Define las reglas que debe cumplir el body de la solicitud
*/
