import { request, response } from "express";
import * as bcrypt from 'bcrypt';
import AppDatasource from '../../providers/data.source.js';
import jwt from 'jsonwebtoken';
import { envs } from '../../configuration/envs.js';

const repo = AppDatasource.getRepository('User');

const register = async (req = request, res = response) => {
    const { nombre, email, rol, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 12);

        const finalUser = { nombre, email, rol, password: hashPassword }

        const newUser = await repo.save(finalUser);

        res.status(201).json({ ok: true, result: newUser, msg: 'Created' })
    }
    catch (error) {
        res.status(400).json({ ok: false, error, msg: 'Error' })
    }
};

const register_alumno = async (req = request, res = response) => {
    const { nombre, email, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 12);

        const finalUser = { nombre, email, rol: 'alumno', password: hashPassword }

        const newUser = await repo.save(finalUser);

        res.status(201).json({ ok: true, result: newUser, msg: 'Created' })
    }
    catch (error) {
        res.status(400).json({ ok: false, error, msg: 'Error' })
    }
};

const register_profesor = async (req = request, res = response) => {
    const { nombre, email, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 12);

        const finalUser = { nombre, email, rol: 'profesor', password: hashPassword }

        const newUser = await repo.save(finalUser);

        res.status(201).json({ ok: true, result: newUser, msg: 'Created' })
    }
    catch (error) {
        res.status(400).json({ ok: false, error, msg: 'Error' })
    }
};

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await repo.findOne({ where: { email } });

        if (!user) {
            res.status(404).json('User not found');
            return;
        }
        //# Acá comparamos la contraseña no hasheada con la que esta almacenada en la base de datos:
        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            res.status(401).json('Wrong password');
            return;
        }

        const payload = { id: user.id, nombre: user.nombre };

        const token = jwt.sign(payload, envs.JWT_SECRET, {
            expiresIn: '1h',
        })

        res.status(200).json({
            ok: true,
            message: 'Login',
            metadata: { user: { ...user, password: '***' }, token },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error, msg: 'Server error' })
    }
};

const findAllProfesor = async (req = request, res = response) => {
    const users = await repo.find({
        where: {
            rol: 'profesor'
        }
    });

    console.log(req.user)

    res.status(200).json({ ok: true, message: 'Approved', data: users })
}

const findOneProfesor = async (req = request, res = response) => {
    const idParam = req.params.id;

    try {
        const user = await repo.find({
            where: {
                id: idParam,
                rol: 'profesor'
            }
        })

        if (!user) {
            return res.status(404).json({ ok: false, msg: "Profesor no encontrado" });
        }

        return res.status(200).json({ ok: true, message: 'Approved', data: user })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error, msg: 'Server error' })
    }
}

export const userController = {
    register,
    register_alumno,
    register_profesor,
    login,
    findAllProfesor,
    findOneProfesor
}