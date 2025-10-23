const authorizeRole = (requiredRole) => (req, res, next) => {
    // 1. Verificar si el usuario y el rol están presentes (vienen del JWT)
    if (!req.user || !req.user.rol) {
        return res.status(403).json({ 
            ok: false, 
            message: 'Acceso denegado. No se encontró información de rol.' 
        });
    }

    // 2. Comprobar si el rol del usuario coincide con el rol requerido
    const userRole = req.user.rol.toLowerCase();
    
    if (userRole === requiredRole.toLowerCase()) {
        next();
    } else {
        return res.status(403).json({ 
            ok: false, 
            message: `Acceso denegado. Se requiere el rol de ${requiredRole}.` 
        });
    }
};

export const isProfesor = authorizeRole('profesor');
export const isAlumno = authorizeRole('alumno');