import Joi from 'joi';

export const createTarea = Joi.object({
    titulo: Joi.string().required(),
    descripcion: Joi.string().required(),
    fechaEntrega: Joi.date().iso().required()
})

/*
    DTO para validar la creación de una tarea
    Define las reglas que debe cumplir el body de la solicitud
*/
