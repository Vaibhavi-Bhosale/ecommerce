const express = require("express");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();


// CREATE PRODUCT
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;

    // simple checks
    if (!name || !price || !image || !category || !description) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
      category,
      description
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE PRODUCT
router.put("/:id", protect, admin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
});


// DELETE PRODUCT
router.delete("/:id", protect, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
