import { EntitySchema } from 'typeorm';

export const ProfesorEntity = new EntitySchema({
    name: 'Profesor',
    tableName: 'profesor',
    columns: {
        id: {
            primary: true,
            type: 'int',
        },
    },
    relations: {
        usuario: {
            target: 'User',
            type: 'one-to-one',
            joinColumn: {
                name: 'id',
                referencedColumnName: 'id',
            },
            eager: true, 
        },
        materiasAsignadas: {
            target: 'Materia',
            type: 'one-to-many',
            inverseSide: 'profesor',
            eager: false,
        },
        tareasAsignadas: {
            target: 'Tarea',
            type: 'one-to-many',
            inverseSide: 'profesor',
            eager: false,
        },
    },
});