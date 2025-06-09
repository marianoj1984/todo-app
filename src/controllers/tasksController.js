const pool = require("../db");

exports.getTasks = async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
};

exports.createTask = async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
    [title]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  await pool.query("UPDATE tasks SET title = $1 WHERE id = $2", [title, id]);
  res.sendStatus(204);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.sendStatus(204);
};
