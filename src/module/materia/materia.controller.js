import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';

// Repositorio de Materia
const materiaRepo = AppDatasource.getRepository('Materia')

// Función para crear un profesor y su usuario
const create = async (req = request, res = response) => {
    const { nombre, profesor_id } = req.body; // Datos recibidos en el body

    // Información del usuario autenticado
    console.log(req.user)

    try {
        // Objeto de la materia con la relacion de su profesor
        const materia = {
            nombre: nombre,
            profesor: { id: profesor_id }
        }

        // Guardar la materia en la base de datos
        const newMateria = await materiaRepo.save(materia);

        // Si todo sale bien responde con un status 201 y los datos de la nueva materia
        res.status(201).json({
            ok: true,
            msg: 'Materia creado con exito',
            newMateria
        });
    }
    catch (error) {
        // En caso de error, devuelve status 400
        res.status(400).json({ ok: false, error, msg: 'Error' });
    }
}

export const materiaController = {
    create
}