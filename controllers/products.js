const { validationResult } = require("express-validator");
const productsModel = require("../models/products");
const AppError = require("../utils/AppError");
const cache = require("../config/cache");
const redis = require("../config/redis");


const productsController = {

  getAll: async (req, res, next) => {
    try {
      const CACHE_KEY = "all_products";
      const cached = await redis.get(CACHE_KEY);
      if (cached) {
        return res.json({
          code: 200,
          source: "redis",
          message: "Successfully get products",
          data: JSON.parse(cached),
        });
      }

      const product = await productsModel.findAll();
      await redis.set(CACHE_KEY, JSON.stringify(product), {EX: 60});
      res.json({
        code: 200,
        source: "database",
        message: "Successfully get products",
        data: product,
      });
    } catch (error) {
      next(error);
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

  getById: async (req, res, next) => {
    try {
      const {id} = req.params;
      const products = await productsModel.findById(id);
      if (!products) {
        throw new AppError("Products not found", 404);
      }
      res.json({
        code: 200,
        message: "Successfully get products",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { name, price, stock } = req.body;
      const data = {
        name: name,
        price: price,
        stock: stock,
      };
      const products = await productsModel.store(data);
      redis.del("all_products");
      res.json({
        code: 200,
        message: "Successfully store products",
        data: {
          id: products.insertId,
          name: data.name,
          price: data.price,
          stock: data.stock,
        },
      });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
        const { name, price, stock } = req.body;
        if (!name && !price && !stock) {
          throw new AppError("name, price, and stock are required", 400);
        }
        const oldProducts = await productsModel.findById(id);
        if (!oldProducts) {
          return res.status(404).json({ message: "Products not found" });
        }
        const data = {
          name: name ? name : oldProducts.name,
          price: price ? price : oldProducts.price,
          stock: stock ? stock : oldProducts.stock,
        };

      await productsModel.update(id, data);
      res.json({
        code: 200,
        message: "Successfully update products",
        data: {
          id: id,
          name: data.name,
          price: data.price,
          stock: data.stock,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;
        const products = await productsModel.findById(id);
      if (!products) {
        throw new AppError("Product not found", 404);
      }
      await productsModel.destroy(id);
      res.json({
        code: 200,
        message: "Successfully delete product",
      });
    } catch (error) {
      next(error);
    }
  },
};
      
module.exports = productsController;










  

  
  
  