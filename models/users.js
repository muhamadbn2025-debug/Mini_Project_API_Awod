const { pool } = require("../config/database");
const bcrypt = require("bcrypt");

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

  //GET BY EMAIL
  getByEmail: async (email) => {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  registration: async (data) => {
    const { name, email, password } = data;

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
  },

  // UPDATE
  update: async (id, data) => {
    const { name, email } = data;

    await pool.query(
      "UPDATE users SET name=?, email=? WHERE user_id=?",
      [name, email, id]
    );
  },

  // DELETE
  delete: async (id) => {
    await pool.query(
      "DELETE FROM users WHERE user_id=?",
      [id]
    );
  },



updatePassword: async (password, id) => {
  const [rows] = await pool.query(
    "UPDATE users SET password = ? WHERE user_id = ?",
    [password, id],
  );
  return rows;
},
};

module.exports = usersModel;









  

  
  
  
  
 