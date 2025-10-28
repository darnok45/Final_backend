import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';
import * as bcrypt from 'bcrypt';
import { matricularAlumnoDTO } from './schema/alumno.dto.js'; 
import { AlumnoEntity } from './entity/alumno.entity.js';
import { MateriaEntity } from '../materia/entity/materia.entity.js';
import { UserEntity } from '../user/entity/user.entity.js';

// Repositorios
const userRepo = AppDatasource.getRepository(UserEntity) 
const alumnoRepo = AppDatasource.getRepository(AlumnoEntity);
const materiaRepo = AppDatasource.getRepository(MateriaEntity);

const create = async (req = request, res = response) => {
  const { nombre, email, password } = req.body; 

  try {
    const hashPassword = await bcrypt.hash(password, 12);

    // 1. Creación del usuario
    const newUser = await userRepo.save({ nombre, email, password: hashPassword });

    // 2. Creación del alumno (ID heredado)
    const newAlumno = await alumnoRepo.save({ id: newUser.id });

    res.status(201).json({
      ok: true,
      msg: 'Alumno creado con exito',
      data: {
        id: newAlumno.id,
        nombre: newUser.nombre,
        email: newUser.email
      }
    });
  }
  catch (error) {
    // Manejo de error: ej. email duplicado (#1062)
    console.error(error); 
    res.status(400).json({ ok: false, error, msg: 'Error al crear alumno' })
  }
}


// ***** LÓGICA DE MATRICULAR ALUMNO (Anteriormente sin función) *****
const matricularAlumno = async (req = request, res = response) => {
    // 1. Validación de DTO
    const { error, value } = matricularAlumnoDTO.validate(req.body);
    if (error) return res.status(400).json({ ok: false, msg: error.message });

    const { alumnoId, materiaId } = value;
    
    try {
        // 2. Búsqueda de entidades
        const alumno = await alumnoRepo.findOne({ where: { id: alumnoId }, relations: ['materias'] });
        const materia = await materiaRepo.findOne({ where: { id: materiaId } });

        // 3. Validación de existencia
        if (!alumno || !materia) {
            return res.status(404).json({ ok: false, msg: 'Alumno o materia no encontrada' });
        }

        // 4. Lógica de matriculación (TypeORM)
        alumno.materias.push(materia);
        await alumnoRepo.save(alumno);

        // 5. Respuesta exitosa
        res.status(201).json({
            ok: true,
            msg: `Alumno matriculado en ${materia.nombre}`,
        });

    } catch (error) {
        console.error(error); // Usar 'error' en lugar de 'err'
        res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
}
// ***** FIN DE LÓGICA DE MATRICULAR ALUMNO *****


export const alumnoController = {
  create,
  matricularAlumno,
};