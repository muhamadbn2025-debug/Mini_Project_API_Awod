const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const product_categoryRouter = require("./routes/product_category");
const authRouter = require("./routes/auth");

const app = express();
const { testConnection } = require("./config/database");
const AppError = require("./utils/AppError");
const errorHandler = require("./middleware/errorHandler");

app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/products_category", product_categoryRouter);

app.get("/test", (req, res) => {
  res.json({ message: "CORS OK" });
});
app.use("/users", usersRouter);
app.use((req, _res, next) => {
  next(new AppError(`${req.method} ${req.url} not found`, 404));
});
app.use(errorHandler);
const start = async () => {
  await testConnection();
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

start();








