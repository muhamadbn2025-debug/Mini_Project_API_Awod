const express = require("express");
const productRouter = require("./routes/products");
const departemenRouter = require("./routes/departemen")

const app = express();
const { testConnection } = require("./config/database");

app.use(express.json());
app.use("/products", productRouter);
app.use("/departemen", departemenRouter);
 
app.listen(3000, () => {
  console.log(`Server: port ${3000}`);
});

const start = async () => {
  await testConnection();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
 };

 start();