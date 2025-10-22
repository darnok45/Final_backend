/* import { AppDataSource } from '../../configuration/orm.config.js';
import { Profesor } from './entity/profesor.entity.js';
import { Materia } from '../materia/entity/materia.entity.js';
import { Alumno } from '../alumno/entity/alumno.entity.js';
import { matricularAlumnoEnMateriaDTO } from './schema/profesor.dto.js';

export class ProfesorController {
  async verEntregas(req, res) {
    const { id } = req.params;

    const profesorRepo = AppDataSource.getRepository('Profesor');
    const profesor = await profesorRepo.findOne({ where: { id }, relations: ['materias', 'materias.entregas'] });

    if (!profesor) return res.status(404).json({ message: 'Profesor no encontrado' });

    // Suponiendo que cada materia tiene una relación "entregas"
    const entregas = profesor.materias.flatMap((materia) => materia.entregas || []);
    return res.json({ profesor: profesor.nombre, entregas });
  }

  async matricularAlumno(req, res) {
    const { id: profesorId } = req.params;
    const { error, value } = matricularAlumnoEnMateriaDTO.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const { alumnoId, materiaId } = value;

    const profesorRepo = AppDataSource.getRepository('Profesor');
    const alumnoRepo = AppDataSource.getRepository('Alumno');
    const materiaRepo = AppDataSource.getRepository('Materia');

    const profesor = await profesorRepo.findOne({ where: { id: profesorId }, relations: ['materias'] });
    const alumno = await alumnoRepo.findOne({ where: { id: alumnoId }, relations: ['materias'] });
    const materia = await materiaRepo.findOne({ where: { id: materiaId }, relations: ['profesor'] });

    if (!profesor || !materia || !alumno)
      return res.status(404).json({ message: 'Profesor, materia o alumno no encontrados' });

    if (materia.profesor.id !== profesor.id)
      return res.status(400).json({ message: 'Esta materia no pertenece al profesor indicado' });

    alumno.materias.push(materia);
    await alumnoRepo.save(alumno);

    return res.status(201).json({
      message: `El alumno ${alumno.nombre} fue matriculado en ${materia.nombre} por el profesor ${profesor.nombre}`,
    });
  }
} */