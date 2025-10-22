import { EntitySchema } from 'typeorm';

export const Profesor = new EntitySchema({
  name: 'Profesor',
  tableName: 'profesores',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    nombre: { type: 'varchar' },
    apellido: { type: 'varchar' },
  },
  relations: {
    materias: {
      target: 'Materia',
      type: 'one-to-many',
      inverseSide: 'profesor',
      eager: true,
    },
  },
});