import passport from "../configuration/passport.js";

// Middleware de autentificación general con Passport y JWT
function authMiddleware(req,res, next) {
    /*
        Utiliza la estrategia 'jwt' definida en la configuracion de passport
        session: false evita que se creen sesiones, ya que JWT no las necesita
    */
    return passport.authenticate('jwt', { session: false }, (err, user) => {
        // Si hay error o el usuario no existe devuelve 401
        if (err || !user){
            return res.status(401).json({message: 'Unauthorized'});
        }

        // Si el token es valido, guarda los datos del usuario en la request
        req.user = user;
        next(); // Continua
    })(req, res, next);
}

export default authMiddleware;