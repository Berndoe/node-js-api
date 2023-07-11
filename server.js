const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

// to allow app to understand JSON format (middleware)
app.use(express.json());

// to allow app to understand form data format
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.send("Hello Node API");
});

// creating a product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// getting all products
app.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// getting a single product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// updating a product
app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// removing a product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(400).json({ message: `cannot find product with id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://berndo:NbDQKKfBkZZDWu7Q@practicenodeapi.w85eobl.mongodb.net/PracticeNodeAPI?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log(`Node API app is running on port 4000`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
