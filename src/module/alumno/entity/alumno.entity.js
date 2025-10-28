import { EntitySchema } from 'typeorm';

export const AlumnoEntity = new EntitySchema({
    name: 'Alumno',
    tableName: 'alumno',
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
        matriculas: {
            target: 'Matricula',
            type: 'one-to-many',
            inverseSide: 'alumno',
            eager: false,
        },
        entregasRealizadas: {
            target: 'Entrega',
            type: 'one-to-many',
            inverseSide: 'alumno',
            eager: false,
        },
    },
});