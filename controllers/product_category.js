const product_categoryModel = require("../models/product_category");

const product_categoryController = {

  getAll: async (req, res) => {
    try {
      const data = await product_categoryModel.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await product_categoryModel.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      await product_categoryModel.create(req.body);
      res.json({ message: "product_category created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      await product_categoryModel.update(req.params.id, req.body);
      res.json({ message: "product_category updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await product_categoryModel.delete(req.params.id);
      res.json({ message: "products_category deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};

module.exports = product_categoryController;