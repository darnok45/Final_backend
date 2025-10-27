import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { envs } from './envs.js'
import AppDatasource from "../providers/data.source.js";

// Repositorio de usuarios para consultar la base de datos
const repo = AppDatasource.getRepository('User');

// Clave secreta para validar los tokens JWT
const JWT_SECRET = envs.JWT_SECRET;

// Opciones de la estrategia JWT
const opts = {
    // Extrae el token del header Authorization: Bearer <token>
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET, // Clave secreta para verificar el token
}

// Configuración de la estrategia JWT
passport.use(
    new Strategy(opts, async (payload, done) => {
        try {
            // Busca el usuario en la base de datos según el ID del token
            const user = await repo.findOne({ where: { id: payload.id} })

            // Si no existe rechaza la autenticación
            if(!user){
                return done(null,false);
            }

            // Adjunta el rol que viene en el token al usuario
            user.rol = payload.rol

            // Retorna el usuario autenticado
            return done(null, user)
        } catch (err) {
            // En caso de error lo devuelve y rechaza la autenticación
            return done(err, false)
        }
    })
);

export default passport;