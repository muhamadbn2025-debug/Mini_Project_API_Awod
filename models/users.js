const { pool } = require("../config/database");

const usersModel = {

  // GET ALL
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  // GET BY ID
  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );
    return rows[0];
  },

  // CREATE
  create: async (data) => {
    const { name, email } = data;

    await pool.query(
      "INSERT INTO users (name, email) VALUES (?, ?, ?, ?, ?)",
      [name, email]
    );
  },

  // UPDATE
  update: async (id, data) => {
    const { name, email } = data;

    await pool.query(
      "UPDATE users SET name=?, email=?, stock=? WHERE user_id=?",
      [name, email]
    );
  },

  // DELETE
  delete: async (id) => {
    await pool.query(
      "DELETE FROM users WHERE user_id=?",
      [id]
    );
  },

};

module.exports = usersModel;