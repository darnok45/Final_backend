import { request, response } from 'express';
import { matricularAlumnoDTO } from './schema/alumno.dto.js';
import AppDataSource from '../../providers/data.source.js';
import { Alumno } from './entity/alumno.entity.js';
import { Materia } from '../materia/entity/materia.entity.js';




const alumnoRepo = AppDataSource.getRepository(Alumno);
const materiaRepo = AppDataSource.getRepository(Materia);




const matricularAlumno = async (req = request, res = response) => {
const { error, value } = matricularAlumnoDTO.validate(req.body);
if (error) return res.status(400).json({ ok: false, msg: error.message });




const { alumnoId, materiaId } = value;




try {
const alumno = await alumnoRepo.findOne({ where: { id: alumnoId }, relations: ['materias'] });
const materia = await materiaRepo.findOne({ where: { id: materiaId } });

if (!alumno || !materia) {
  return res.status(404).json({ ok: false, msg: 'Alumno o materia no encontrada' });
}

alumno.materias.push(materia);
await alumnoRepo.save(alumno);

res.status(201).json({
  ok: true,
  msg: `Alumno matriculado en ${materia.nombre}`,
});




} catch (err) {
console.error(err);
res.status(500).json({ ok: false, msg: 'Error en el servidor' });
}
};




export const alumnoController = {
matricularAlumno,
};