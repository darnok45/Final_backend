import joi from 'joi';

export const createUser = joi.object({
    nombre: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),

});

/*
    DTO para validar la creación de un usuario
    Define las reglas que debe cumplir el body de la solicitud
*/
