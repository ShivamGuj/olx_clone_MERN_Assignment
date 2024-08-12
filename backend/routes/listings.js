const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.post("/newProduct", async (req, res) => {
  try {
    const { name, price, status, userId } = req.body;

    if (!name || !price || !userId) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newProduct = new Product({
      name,
      price,
      status,
      userId,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/products", async (req, res) => {
  const { page = 1, limit = 15 } = req.query;

  try {
    const products = await Product.find({ status: "unsold" })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments({ status: "unsold" });

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/products/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const products = await Product.find({ userId });

    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found for this user" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/buy", async (req, res) => {
  const { _Id, userId } = req.body;
  try {
    const product = await Product.findOne({ _Id });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    product.status = "sold";
    product.buyerId = userId;
    await product.save();
    res.json({ success: true, message: "Product purchased successfully." });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/purchased-products/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const purchasedProducts = await Product.find({ buyerId: userId });
    res.json({ success: true, products: purchasedProducts });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
