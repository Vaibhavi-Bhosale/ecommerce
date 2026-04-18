const express = require("express");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/multer");
const router = express.Router();
const cloudinary = require("../config/cloudinary");


//Testing only
router.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.send("Test working");
});

// CREATE PRODUCT
 
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  
  try {
    const { name, price, category, description } = req.body;

    const imageUrl = req.file.path;
    const imageId = req.file.filename;


    console.log("Received product creation request with data:", {
      name,
      price,  
      category,
      description,
      image: imageUrl,
      imageId,
    });

    if (
      !name ||
      !price ||
      !imageUrl ||
      !category ||
      !description ||
      !imageId
    ) {
      return res.status(400).json({
        error: "fields are missing",
        message: "All fields are required",
      });
    }

    const product = await Product.create({
      name,
      price,
      image: imageUrl,
      imageId,
      category,
      description,
    });

    res.status(201).json({data: product, message: "Product created successfully"});

  } catch (error) {
    res.status(500).json({ message: "Product not created" , error : error.message});
  }
});

// UPDATE PRODUCT
router.put("/:id", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let image = product.image;
    let imageId = product.imageId;

    if (req.file) {
      if (imageId) {
        await cloudinary.uploader.destroy(imageId);
      }

      image = req.file.path;
      imageId = req.file.filename;
    }

    const result = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        category,
        description,
        image,
        imageId,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      message: "Product not updated",
      error: error.message,
    });
  }
});

// DELETE PRODUCT
router.delete("/:id", protect, admin, async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    res.status(400).json({error : "product id is not there", message: "Product id not Found" });
  }

  const product = await Product.findById({_id:productId});
  // console.log(product)

   if (!product) {
    res.status(400).json({ error : "product not found in database",message: "Product  not Found" });
  }

  const deleteRes = await cloudinary.uploader.destroy(product.imageId);

  // console.log("DELETE RESULT:", deleteRes);

  await Product.findByIdAndDelete({ _id: productId });
  res.json({ message: "Product deleted" });
});

module.exports = router;
