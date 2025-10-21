import { getConnection } from "../../database/database.js";

const getAll = async (req, res) => {
  const connection = await getConnection();
  const [result] = await connection.query('SELECT * FROM usuario WHERE rol = "alumno"');
  res.status(200).json({ ok: true, result, msg: "Lista de alumnos obtenida" });
};

const tarea = async (req, res) => {
  const { id } = req.params;
  const connection = await getConnection();
  const [result] = await connection.query('SELECT * FROM tarea WHERE usuarioID = ?', [id]);
  res.status(200).json({ ok: true, tareas: result });
};

export const alumnoController = { getAll, tarea };
