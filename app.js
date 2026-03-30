const express = require("express");
const productRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const product_categoryRouter = require("./routes/product_category");

const app = express();
const { testConnection } = require("./config/database");

app.use(express.json());
app.use("/products", productRouter);
app.use("/users", usersRouter);
app.use("/product_category", product_categoryRouter);

const start = async () => {
  await testConnection();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

start();
