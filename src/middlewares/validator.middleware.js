// Middleware genérico para validar el cuerpo de las solicitudes usando un DTO
export const validate = (dto) => (req, res, next) => {
    const { error } = dto.validate(req.body);

    // Si hay errores en la validación, responde con un status 400 y los detalles de error
    if (error) return res.status(400).json({ error: error.details });

    // Si es correcto continua
    next();
};
