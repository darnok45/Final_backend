import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
    name: "User",
    tableName: "usuarios",
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
        rol: {
            type: "varchar",
            nullable: false
        }, // "alumno" o "profesor"
        password: {
            type: "varchar",
            nullable: false
        }
    }
});
