/*
    Middleware para la verificación de rol que sera utilizado posteriormente en los routes
    Para permitir el acceso unicamente a los usuarios con el rol requerido
*/

const authorizeRole = (requiredRole) => (req, res, next) => {
    // 1. Verifica la autentificación del usuario y si tiene un rol asignado
    if (!req.user || !req.user.rol) {
        return res.status(403).json({ 
            ok: false, 
            message: 'Acceso denegado. No se encontró información de rol.' 
        });
    }

    // 2. Comprobar si el rol del usuario coincide con el rol requerido
    const userRole = req.user.rol.toLowerCase(); // toLowerCase: convierte todo el string a minuscula
    
    if (userRole === requiredRole.toLowerCase()) {
        next(); // Si el rol coincide, permite continuar
    } else {
        return res.status(403).json({ 
            ok: false, 
            message: `Acceso denegado. Se requiere el rol de ${requiredRole}.` 
        });
    }
};

/*
    Exportación del middleware para poder utilizar segun el rol.
    Ejecuta la función y envia el rol a verificar en el parametro
*/
export const isProfesor = authorizeRole('profesor');
export const isAlumno = authorizeRole('alumno');