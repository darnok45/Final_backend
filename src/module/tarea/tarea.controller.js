import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';

const tareaRepo = AppDatasource.getRepository('Tarea')

const create = async (req = request, res = response) => {
    const profesor_id = req.params.id;
    const materia_id = req.params.id2;
    const { titulo, descripcion, fechaEntrega } = req.body;

    try {
        const tarea = {
            titulo: titulo,
            descripcion: descripcion,
            fechaEntrega: fechaEntrega,
            profesor: { id: profesor_id },
            materia: { id: materia_id }
        }

        const newTarea = await tareaRepo.save(tarea);

        res.status(201).json({
            ok: true,
            msg: 'Tarea creado con exito',
            newTarea
        });
    }
    catch (error) {
        res.status(400).json({ ok: false, error, msg: 'Error' });
    }
}

export const tareaController = {
    create
}