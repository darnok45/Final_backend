import { request, response } from "express";
import AppDatasource from '../../providers/data.source.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { envs } from '../../configuration/envs.js';

const repo = AppDatasource.getRepository('User');

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // Cargar el usuario Y sus relaciones de roles
        const user = await repo.findOne({ 
            where: { email },
            relations: { profesor: true, alumno: true } // Cargar ambas relaciones
        });

        // Acá comparamos la contraseña no hasheada con la que esta almacenada en la base de datos:
        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            res.status(401).json('Wrong password');
            return;
        }

        let rol = 'admin';
        if (user.profesor) {
            rol = 'profesor';
        } else if (user.alumno) {
            rol = 'alumno';
        }

        const payload = { id: user.id, nombre: user.nombre, rol }; 

        const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            ok: true,
            message: 'Login exitoso',
            metadata: { user: { ...user, password: '***', rol }, token },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error, msg: 'Server error' })
    }
};

export const userController = {
    login
}