import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';

const materiaRepo = AppDatasource.getRepository('Materia')

// Función para crear un profesor y su usuario
const create = async (req = request, res = response) => {
    const { nombre, profesor_id } = req.body;

    console.log(req.user)

    try {
        const materia = {
            nombre: nombre,
            profesor: { id: profesor_id }
        }
        
        const newMateria = await materiaRepo.save(materia);

        res.status(201).json({
            ok: true,
            msg: 'Materia creado con exito',
            newMateria
        });
    }
    catch (error) {
        res.status(400).json({ ok: false, error, msg: 'Error' });
    }
}

export const materiaController = {
    create
}