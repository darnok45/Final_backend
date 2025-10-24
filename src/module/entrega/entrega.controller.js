import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';

// Repositorio de Entrega
const entregaRepo = AppDatasource.getRepository('Entrega')

const create = async (req = request, res = response) => {
    // ID que sera enviado por parametros e ID que seran enviado en el body
    const { tarea_id } = req.body;
    const alumno_id = req.params.id;

    // Información del usuario autenticado
    console.log(req.user)

    try {
        // Objeto de entrega con relación a tarea y alumno
        const entrega = {
            tarea: { id: tarea_id },
            alumno: { id: alumno_id }
        }

        // Guardar la entrega en la base de datos
        const newEntrega = await entregaRepo.save(entrega);

        // Response exitoso con status 201 y los datos de la entrega
        res.status(201).json({
            ok: true,
            msg: 'Tarea entregada con exito',
            newEntrega
        });
    }
    catch (error) {
        // En caso de error devuelve status 400
        res.status(400).json({ ok: false, error, msg: 'Error' });
    }
}

export const entregaController = {
    create
}