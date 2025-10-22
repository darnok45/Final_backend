import joi from 'joi';

export const createUser = joi.object({
    nombre: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
});
