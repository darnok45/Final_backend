import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';
import { io } from "../../index.js"; // Instancia de socket.io para manejo de notificaciones

// Repositorios de Tarea y Matricula
const tareaRepo = AppDatasource.getRepository('Tarea')
const matriculaRepo = AppDatasource.getRepository('Matricula')

const create = async (req = request, res = response) => {
    // IDs que seran enviados por parametros y datos que seran enviados en el body
    const profesor_id = req.params.id;
    const materia_id = req.params.id2;
    const { titulo, descripcion, fechaEntrega } = req.body;

    console.log(req.user); // Se mostrara en consola la inforamción del usuario autenticado

    try {
        // Crea el objeto tarea con las relaciones de profesor y materia
        const tarea = {
            titulo: titulo,
            descripcion: descripcion,
            fechaEntrega: fechaEntrega,
            profesor: { id: profesor_id },
            materia: { id: materia_id }
        }

        // Guarda la tarea en la base de datos
        const newTarea = await tareaRepo.save(tarea);

        // Notificación socket.io:

        // Buscar todas las matriculas de alumnos de la materia para la notifcación
        const matriculas = await matriculaRepo.find({
            where: { materia: { id: materia_id } },
            relations: { alumno: { usuario: true } }
        });

        // Creación de objeto para la notificación
        const notificacion = {
            message: `El profesor ${req.user.nombre} ha subido una nueva tarea`,
            tareaTitulo: titulo
        }

        // Emitir notificación a cada alumno conectado via socket.io
        matriculas.forEach(matricula => {
            const alumnoUser = matricula.alumno.usuario.id;

            io.to(`user-${alumnoUser}`).emit('new_tarea_assigned', notificacion)
        })

        // Devuelve 201 con los datos de la nueva tarea
        res.status(201).json({
            ok: true,
            msg: 'Tarea creado con exito',
            newTarea
        });
    }
    catch (error) {
        // En caso de error devuelve con un status 400
        res.status(400).json({ ok: false, error, msg: 'Error' });
    }
}

export const tareaController = {
    create
}