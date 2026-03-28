const { pool } = require("../config/database");

const departemenModel = {

  // GET ALL
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM departemen");
    return rows;
  },

  // GET BY ID
  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM departemen WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // CREATE
  create: async (data) => {
    const { name } = data;

    await pool.query(
      "INSERT INTO departemen (name) VALUES (?)",
      [name]
    );
  },

  // UPDATE
  update: async (id, data) => {
    const { name } = data;

    await pool.query(
      "UPDATE departemen SET name=? WHERE id=?",
      [name, id]
    );
  },

  // DELETE
  delete: async (id) => {
    await pool.query(
      "DELETE FROM departemen WHERE id=?",
      [id]
    );
  }

};

module.exports = departemenModel;