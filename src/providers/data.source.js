import { DataSource } from "typeorm";
import {envs} from '../configuration/envs.js';
import { UserEntity } from "../module/user/entity/user.entity.js";
import { TareaEntity } from "../module/tarea/entity/tarea.entity.js";
import { MatriculaEntity } from "../module/matricula/entity/matricula.entity.js";
import { EntregaEntity } from "../module/entrega/entity/entrega.entity.js";
import { MateriaEntity } from "../module/materia/entity/materia.entity.js";
import { ProfesorEntity } from "../module/profesor/entity/profesor.entity.js";
import { AlumnoEntity } from "../module/alumno/entity/alumno.entity.js";

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
        UserEntity,
        ProfesorEntity,
        AlumnoEntity,
        TareaEntity,
        MatriculaEntity,
        EntregaEntity,
        MateriaEntity
    ]
});

export default AppDataSource