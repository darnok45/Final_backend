import { EntitySchema} from "typeorm";

export const EntregaEntity = new EntitySchema({
    name: "Entrega",
    tableName: "entrega",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        horaEntrega: {
            type: "timestamp", 
            nullable: false,
            default: () => "CURRENT_TIMESTAMP"
        },
    },
    relations: {
        tarea: {
            target: "Tarea",
            type: "many-to-one",
            joinColumn: {
                name: "tarea_id",
                referencedColumnName: "id",
            },
            inverseSide: "entregas"
        },
        alumno: {
            target: "Alumno",
            type: "many-to-one",
            joinColumn: {
                name: "alumno_id",
                referencedColumnName: "id",
            },
            inverseSide: "entregasRealizadas"
        }
    }
});