import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { envs } from '../../configuration/envs.js';

// Repositorio de usuarios
const repo = AppDatasource.getRepository('User');

const login = async (req = request, res = response) => {
    const { email, password } = req.body; // Datos recibidos en el body

    try {
        // Buscar usuario por email. Ademas, carga las relaciones con los roles (profesor o alumno)
        const user = await repo.findOne({
            where: { email },
            relations: { profesor: true, alumno: true }
        });

        // Si no existe el usuario devuelve 404
        if (!user) {
            return res.status(404).json('Usuario no encontrado')
        }

        // Acá comparamos la contraseña no hasheada con la que esta almacenada en la base de datos
        const isPassword = await bcrypt.compare(password, user.password);

        // Si la contraseña no es la misma devuelve 401
        if (!isPassword) {
            res.status(401).json('El usuario o la contraseña son incorrectos');
            return;
        }

        // Determina el rol según la relacion cargada
        let rol
        if (user.profesor) {
            rol = 'profesor';
        } else if (user.alumno) {
            rol = 'alumno';
        }

        // Crear payload para JWT. Ademas guardamos el rol que sera utilizado a futuro
        const payload = { id: user.id, nombre: user.nombre, rol: rol };

        // Generación de token con expiración de 1 hora
        const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: '1h' });

        // Devuelve 200 con información de usuario y el token
        res.status(200).json({
            ok: true,
            message: 'Login exitoso',
            metadata: { user: { ...user, password: '***', rol }, token },
        });
    } catch (error) {
        // Captura y muestra de error
        console.error(error);
        res.status(500).json({ ok: false, error, msg: 'Server error' })
    }
};

export const userController = {
    login
}