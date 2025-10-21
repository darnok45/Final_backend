import { getConnection } from "../../database/database.js";

const verMaterias = async (req, res) => {
  const { id } = req.params;
  const connection = await getConnection();
  const [result] = await connection.query('SELECT * FROM materia WHERE profesorID = ?', [id]);
  res.status(200).json({ ok: true, materias: result });
};

const crearTarea = async (req, res) => {
  const { id, id2 } = req.params; // id = profesor, id2 = materia
  const { titulo, descripcion } = req.body;
  const connection = await getConnection();

  const [materia] = await connection.query('SELECT * FROM materia WHERE id = ? AND profesorID = ?', [id2, id]);
  if (materia.length === 0) {
    return res.status(403).json({ ok: false, msg: "Esa materia no pertenece a este profesor" });
  }

  const [result] = await connection.query(
    'INSERT INTO tarea (titulo, descripcion, materiaID, profesorID) VALUES (?, ?, ?, ?)',
    [titulo, descripcion, id2, id]
  );

  res.status(201).json({ ok: true, msg: "Tarea creada correctamente", idTarea: result.insertId });
};

export const profesorController = { verMaterias, crearTarea };
