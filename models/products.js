const { pool } = require("../config/database");

const productsModel = {

  // GET ALL
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },

  // GET BY ID
  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE product_id = ?",
      [id]
    );
    return rows[0];
  },

  // CREATE
  store: async (data) => {
    const { product_name, price, stock, user_id, category_id } = data;

    await pool.query(
      "INSERT INTO products (product_name, price, stock, user_id, category_id) VALUES (?, ?, ?, ?, ?)",
      [product_name, price, stock, user_id, category_id]
    );
  },

  // UPDATE
  update: async (id, data) => {
    const { product_name, price, stock } = data;

    await pool.query(
      "UPDATE products SET product_name=?, price=?, stock=? WHERE product_id=?",
      [product_name, price, stock, id]
    );
  },

  // DELETE
  destroy: async (id) => {
    await pool.query(
      "DELETE FROM products WHERE product_id=?",
      [id]
    );
  },

  // JOIN 
  getWithCategory: async () => {
    const [rows] = await pool.query(`
      SELECT p.product_id, p.product_name, p.price, c.category_name
      FROM products p
      JOIN product_category c
      ON p.category_id = c.category_id
    `);
    return rows;
  },

  // AGGREGATION - jumlah products per category
  countPerCategory: async () => {
  const [rows] = await pool.query(`
    SELECT c.category_id, c.category_name, COUNT(p.product_id) as total_products
    FROM product_category c
    LEFT JOIN products p ON c.category_id = p.category_id
    GROUP BY c.category_id, c.category_name
  `);
  return rows;
  },

};

module.exports = productsModel;