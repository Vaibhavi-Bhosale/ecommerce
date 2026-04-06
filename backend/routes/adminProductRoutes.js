const express = require("express");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/multer");
const router = express.Router();

router.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.send("Test working");
});

// CREATE PRODUCT
// upload.single("image")
router.post("/", protect,admin, upload.single("image"), async ( req, res) => {

  console.log("CLOUD:", process.env.CLOUD_NAME);
console.log("KEY:", process.env.API_KEY);
  console.log("create product route working")
 
  
  console.log("product create api hit");
  
 

  try {
    const { product_name, price,  category, description } = req.body;

    const imageUrl = req.file.path;

    // simple checks
    if (!product_name || !price || !imageUrl || !category || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await Product.create({
      name : product_name,
      price,
      image: imageUrl,
      category,
      description,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PRODUCT
router.put("/:id", protect, admin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
});

// DELETE PRODUCT
router.delete("/:id", protect, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
