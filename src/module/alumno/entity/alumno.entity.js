import { EntitySchema } from 'typeorm';
import { MateriaEntity } from '../../materia/entity/materia.entity.js';

export const AlumnoEntity = new EntitySchema({
  name: 'Alumno',
  tableName: 'alumnos',
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
      type: 'many-to-many',
      joinTable: true,
      eager: true,
    },
  },
});