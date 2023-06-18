const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://root:root@mongo:27017/products?authSource=admin")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const Product = mongoose.model("Product", { name: String });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/products", async (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  const product = new Product({ name });
  await product.save();
  res.json(product);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
