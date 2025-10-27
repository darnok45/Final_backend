import { EntitySchema, JoinColumn } from "typeorm";

export const UserEntity = new EntitySchema({
    name: "User",
    tableName: "usuario",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true
        },
        nombre: {
            type: "varchar",
            nullable: false
        },
        email: {
            type: "varchar",
            nullable: false,
            unique: true
        },
        password: {
            type: "varchar",
            nullable: false
        }
    },
    relations: {
        profesor: {
            target: "Profesor",
            type: "one-to-one",
            inverseSide: "usuario",
            JoinColumn: true
        },
        alumno: {
            target: "Alumno",
            type: "one-to-one",
            inverseSide: "usuario",
            JoinColumn: true
        }
    }
});
