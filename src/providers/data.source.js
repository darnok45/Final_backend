import { DataSource } from "typeorm";
import {envs} from '../configuration/envs.js';

const AppDataSource = new DataSource({
    type: 'mysql',
    // Credenciales
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASS,
    database: envs.DATABASE,
    //
    synchronize: true, // EN DESARROLLO SIEMPRE TRUE
    logger: false,
    entities: []
});

export default AppDataSource