import joi from 'joi';
import dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

// Esquema de validación para las variables de entorno utilizando joi
const envsSchema = joi
    .object({
        PORT: joi.number().required(),
        DATABASE: joi.string().required(),
        DB_PORT: joi.number().required(),
        DB_USER: joi.string().required(),
        DB_PASS: joi.string().allow('').optional(),
        DB_HOST: joi.string().required(),
        NODE_ENV: joi.string().required(),
        JWT_SECRET: joi.string().required(),
    })
    .unknown(true); // Permite otras variables de entorno adicionales

    // Validación de las variables de entorno cargadas
const { value, error } = envsSchema.validate(process.env);

// Si alguna variable requerida falta o es incorrecta, lanza un error y detiene la app
if (error) throw new Error(error.message);

// Exporta las variables validadas para usarlas en la aplicación
export const envs = {
    PORT: value.PORT,
    DATABASE: value.DATABASE,
    DB_PORT: value.DB_PORT,
    DB_USER: value.DB_USER,
    DB_PASS: value.DB_PASS,
    DB_HOST: value.DB_HOST,
    NODE_ENV: value.NODE_ENV,
    JWT_SECRET: value.JWT_SECRET,
};