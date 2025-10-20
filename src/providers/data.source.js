import { DataSource } from "typeorm";
import {envs} from '../configuration/envs.js';
import { UserEntity } from "../module/user/entity/user.entity.js";

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
    entities: [
        UserEntity
    ]
});

export default AppDataSource