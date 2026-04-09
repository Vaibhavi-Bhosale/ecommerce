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
    const { product_name, price, category, description } = req.body;

    const imageUrl = req.file.path;
    const imageId = req.file.filename;

    
    if (
      !product_name ||
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
      name: product_name,
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
    
    const { product_name, price, category, description } = req.body;
    const product_Id = req.params.id;

   
    if (!product_Id) {
      res.status(400).json({ error: "product id is not there", message: "No Product Found" });
    }

    const product = await Product.findById(product_Id);
    const imageIdOld = product.imageId;

    if (req.file && imageIdOld) {
      const deleteRes = await cloudinary.uploader.destroy(imageIdOld);
    }

    const image = req.file.path;
    const imageId = req.file.filename;

    const result = await Product.findOneAndUpdate(
      { _id: product_Id },
      {
        product_name,
        price,
        category,
        description,
        image,
        imageId,
      },
      { new: true },
    );

    // console.log(result);
    if (res) {
      res
        .status(200)
        .json({ message: "Product updatet successfull", data: result });
    }
  } catch (error) {
    
    res.status(401).json({ error: error.message , message : "user not update"});
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
