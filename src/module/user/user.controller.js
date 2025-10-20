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

export const userController = {
    register,
}