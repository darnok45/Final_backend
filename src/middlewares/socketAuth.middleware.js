import jwt from 'jsonwebtoken';
import { envs } from '../configuration/envs.js'; 

// Middleware de autenticación para socket.io que se ejecutara antes de establecer la conexión
export const socketAuthMiddleware = (socket, next) => {
    // Obtiene el header de Authorization enviado durante el handshake inicial
    const authHeader = socket.handshake.headers.authorization;

    // Guarda el JWT si el header comienza con 'Bearer
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    // Si el token no se envia se rechaza la conexión
    if (!token) {
        return next(new Error('Authentication error: Token missing'));
    }

    try {
        // Verifica la validez del token y obtiene los datos del usuario
        const payload = jwt.verify(token, envs.JWT_SECRET);

        // Guarda los datos del usuario autenticado en el socket para luego ser utilizado
        socket.handshake.auth = payload; 
        next(); // Continua
    } catch (error) {
        // Manejo de errores por si el token no es valido o expiró: Rechaza la conexión
        console.error('Socket.IO JWT Error:', error.message);
        return next(new Error('Authentication error: Invalid token'));
    }
};