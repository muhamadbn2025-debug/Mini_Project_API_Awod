const { pool } = require("../config/database");

const product_categoryModel = {

  // GET ALL
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM product_category");
    return rows;
  },

  // GET BY ID
  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM product_category WHERE category_id = ?",
      [id]
    );
    return rows[0];
  },

  // CREATE
  create: async (data) => {
    const { category_name } = data;

    await pool.query(
      "INSERT INTO product_category (category_name) VALUES (?)",
      [category_name]
    );
  },

  // UPDATE
  update: async (id, data) => {
    const { category_name } = data;

    await pool.query(
      "UPDATE product_category SET category_name=? WHERE category_id=?",
      [category_name, id]
    );
  },

  // DELETE
  delete: async (id) => {
    await pool.query(
      "DELETE FROM product_category WHERE category_id=?",
      [id]
    );
  },

  // JOIN 
  // getWithCategory: async () => {
  //   const [rows] = await pool.query(`
  //     SELECT p.product_id, p.product_name, p.price, c.category_name
  //     FROM products p
  //     JOIN product_category c
  //     ON p.category_id = c.category_id
  //   `);
  //   return rows;
  // }

};

module.exports = product_categoryModel;