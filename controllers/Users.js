const usersModel = require("../models/users");

const usersController = {

  getAll: async (req, res) => {
    try {
      const data = await usersModel.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await usersModel.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      await usersModel.create(req.body);
      res.json({ message: "users created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      await usersModel.update(req.params.id, req.body);
      res.json({ message: "users updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await usersModel.delete(req.params.id);
      res.json({ message: "users deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};

module.exports = usersController;