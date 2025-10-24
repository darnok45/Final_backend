import Joi from 'joi';

export const createMateria = Joi.object({
    nombre: Joi.string().required(),
    profesor_id: Joi.number().required() 
})

/*
    DTO para validar la creación de una materia
    Define las reglas que debe cumplir el body de la solicitud
*/