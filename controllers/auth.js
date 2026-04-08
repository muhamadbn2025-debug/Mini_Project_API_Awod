require("dotenv").config();
const { validationResult } = require("express-validator");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authController = {
  // REGISTRATION + JWT
  registration: async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;
    console.log("password saat register:", password);


    const hashPassword = await bcrypt.hash(password, 10)
    console.log("hash yang disimpan:", hashPassword);

    const data = {
      name,
      email,
      password: hashPassword,
    };

    await userModel.registration(data);

    // AMBIL USER LAGI (buat dapet user_id)
    const user = await userModel.getByEmail(email);

    // BUAT TOKEN
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(201).json({
      code: 201,
      message: "Successfully registration",
      data: {
        token,
      },
    });

  } catch (error) {
    next(error);
  }
},

  // LOGIN + JWT
  login: async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const user = await userModel.getByEmail(email);
      console.log("password dari request:", password);
      console.log("hash dari DB:", user.password);

      
      if (!user) {
        throw new AppError("Email or password is wrong", 400);
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      console.log("hasil compare:", checkPassword);
      
      if (!checkPassword) {
        throw new AppError("Email or password is wrong", 400);
      }

      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      res.json({
        code: 200,
        message: "Successfully login",
        data: {
          token,
          user: {
            name: user.name,
            email: user.email,
          },
        },
      });

    } catch (error) {
      next(error);
    }
  },

  // PROFILE (pakai token)
  profile: async (req, res, next) => {
    try {
      res.json({
        code: 200,
        message: "Success get profile",
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  },

  // UPDATE PASSWORD
  update: async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const user = await userModel.getByEmail(email);

      if (!user) {
        return res.status(404).json({
          code: 404,
          message: "Email not found",
        });
      }

      const newPassword = await bcrypt.hash(password, 10);

      await userModel.updatePassword(newPassword, user.user_id);

      res.json({
        code: 200,
        message: "Successfully update password",
      });

    } catch (error) {
      next(error);
    }
  },

};

module.exports = authController;
      