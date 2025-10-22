import { EntitySchema} from "typeorm";

export const TareaEntity = new EntitySchema({
    name: "Tarea",
    tableName: "tarea",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        titulo: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        descripcion: {
            type: "text",
            nullable: true,
        },
        fechaEntrega: {
            type: "date",
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
            inverseSide: "tareasAsignadas"
        },
        materia: {
            target: "Materia",
            type: "many-to-one",
            joinColumn: {
                name: "materia_id",
                referencedColumnName: "id",
            },
            inverseSide: "tareas"
        },
        entregas: {
            target: "Entrega",
            type: "one-to-many",
            inverseSide: "tarea"
        }
    }
});