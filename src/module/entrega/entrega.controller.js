import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';

const entregaRepo = AppDatasource.getRepository('Entrega')

const create = async (req = request, res = response) => {
    const { tarea_id } = req.body;
    const alumno_id = req.params.id;

    console.log(req.user)

    try {
        const entrega = {
            tarea: { id: tarea_id },
            alumno: { id: alumno_id }
        }

        const newEntrega = await entregaRepo.save(entrega);

        res.status(201).json({
            ok: true,
            msg: 'Tarea entregada con exito',
            newEntrega
        });
    }
    catch (error) {
        res.status(400).json({ ok: false, error, msg: 'Error' });
    }
}

export const entregaController = {
    create
}