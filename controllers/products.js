const productsModel = require("../models/products");

const productController = {

  getAll: async (req, res) => {
    try {
      const data = await productsModel.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getWithCategory: async (req, res) => {
    try {
      const data = await productsModel.getWithCategory();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await productsModel.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      await productsModel.create(req.body);
      res.json({ message: "Product created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      await productsModel.update(req.params.id, req.body);
      res.json({ message: "Product updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await productsModel.delete(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};

module.exports = productController;