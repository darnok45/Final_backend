import { matricularAlumnoDTO } from './schema/alumno.dto.js';
import { AppDataSource } from '../../configuration/orm.config.js';
import { Alumno } from './entity/alumno.entity.js';
import { Materia } from '../materia/entity/materia.entity.js';

export class AlumnoController {
  async matricularAlumno(req, res) {
    const { error, value } = matricularAlumnoDTO.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const { alumnoId, materiaId } = value;

    const alumnoRepo = AppDataSource.getRepository('Alumno');
    const materiaRepo = AppDataSource.getRepository('Materia');

    const alumno = await alumnoRepo.findOne({ where: { id: alumnoId }, relations: ['materias'] });
    const materia = await materiaRepo.findOne({ where: { id: materiaId } });

    if (!alumno || !materia) {
      return res.status(404).json({ message: 'Alumno o materia no encontrada' });
    }

    alumno.materias.push(materia);
    await alumnoRepo.save(alumno);

    return res.status(201).json({ message: `Alumno matriculado en ${materia.nombre}` });
  }
}