const departemenModel = require("../models/departemen");

const departemenController = {

  getAll: async (req, res) => {
    try {
      const data = await departemenModel.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await departemenModel.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      await departemenModel.create(req.body);
      res.json({ message: "Departemen created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      await departemenModel.update(req.params.id, req.body);
      res.json({ message: "Departemen updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await departemenModel.delete(req.params.id);
      res.json({ message: "Departemen deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};

module.exports = departemenController;