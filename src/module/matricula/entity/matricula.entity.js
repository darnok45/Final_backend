import { EntitySchema} from "typeorm";

export const MatriculaEntity = new EntitySchema({
    name: "Matricula",
    tableName: "matricula",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
    },
    relations: {
        alumno: {
            target: "Alumno",
            type: "many-to-one",
            joinColumn: {
                name: "alumno_id",
                referencedColumnName: "id",
            },
            inverseSide: "matriculas"
        },
        materia: {
            target: "Materia",
            type: "many-to-one",
            joinColumn: {
                name: "materia_id",
                referencedColumnName: "id",
            },
            inverseSide: "matriculas"
        }
    }
});