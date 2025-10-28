import { EntitySchema} from "typeorm";

export const MateriaEntity = new EntitySchema({
    name: "Materia",
    tableName: "materia",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
    },
    relations: {
        profesor: {
            target: "Profesor",
            type: "many-to-one",
            joinColumn: {
                name: "profesor_id",
                referencedColumnName: "id",
            },
            inverseSide: "materiasAsignadas"
        },
        tareas: {
            target: "Tarea",
            type: "one-to-many",
            inverseSide: "materia"
        },
        matriculas: {
            target: "Matricula",
            type: "one-to-many",
            inverseSide: "materia"
        }
    }
});