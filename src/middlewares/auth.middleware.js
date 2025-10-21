import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ ok: false, msg: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // guarda info del usuario autenticado
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, msg: "Token inválido o expirado" });
  }
};
