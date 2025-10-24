import { request, response } from 'express';
import AppDataSource from '../../providers/data.source.js';
import { Profesor } from './entity/profesor.entity.js';
import { Alumno } from '../alumno/entity/alumno.entity.js';
import { Materia } from '../materia/entity/materia.entity.js';
import { matricularAlumnoEnMateriaDTO } from './schema/profesor.dto.js';




const profesorRepo = AppDataSource.getRepository(Profesor);
const alumnoRepo = AppDataSource.getRepository(Alumno);
const materiaRepo = AppDataSource.getRepository(Materia);




// GET /profesor//entregar
const verEntregas = async (req = request, res = response) => {
const { id } = req.params;




try {
const profesor = await profesorRepo.findOne({
where: { id },
relations: ['materias', 'materias.entregas'],
});

if (!profesor) {
  return res.status(404).json({ ok: false, msg: 'Profesor no encontrado' });
}

// Combinar entregas de todas las materias del profesor
const entregas = profesor.materias.flatMap((materia) => materia.entregas || []);

res.status(200).json({
  ok: true,
  msg: 'Entregas obtenidas correctamente',
  data: entregas,
});




} catch (error) {
console.error(error);
res.status(500).json({ ok: false, msg: 'Error en el servidor' });
}
};




// POST /profesor//matricula
const matricularAlumno = async (req = request, res = response) => {
const { id: profesorId } = req.params;




const { error, value } = matricularAlumnoEnMateriaDTO.validate(req.body);
if (error) return res.status(400).json({ ok: false, msg: error.message });




const { alumnoId, materiaId } = value;




try {
const profesor = await profesorRepo.findOne({ where: { id: profesorId }, relations: ['materias'] });
const alumno = await alumnoRepo.findOne({ where: { id: alumnoId }, relations: ['materias'] });
const materia = await materiaRepo.findOne({ where: { id: materiaId }, relations: ['profesor'] });

if (!profesor || !materia || !alumno) {
  return res.status(404).json({ ok: false, msg: 'Profesor, materia o alumno no encontrados' });
}

if (materia.profesor.id !== profesor.id) {
  return res.status(400).json({ ok: false, msg: 'La materia no pertenece al profesor indicado' });
}

alumno.materias.push(materia);
await alumnoRepo.save(alumno);

res.status(201).json({
  ok: true,
  msg: `El alumno ${alumno.nombre} fue matriculado en ${materia.nombre} por el profesor ${profesor.nombre}`,
});

} catch (error) {
console.error(error);
res.status(500).json({ ok: false, msg: 'Error en el servidor' });
}
};


export const profesorController = {
verEntregas,
matricularAlumno,
};