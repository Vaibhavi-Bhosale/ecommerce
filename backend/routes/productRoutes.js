const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {

  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({error:error.message, message: "unabel to get all products" });
  }
});

//Search Products

router.get("/search", async(req, res)=>{
     try{
          const keyword = req.query.search ?
          {
              name : {
                 $regex : req.query.search,
                 $options : "i"
              }
          }
          :{}
          
          const products = await Product.find(keyword);
          // console.log(products)
           
          res.json({data : products, message:"product search"});

          
     }
     catch(error){
        res.status(500).json({error:error.message, message: "unable to search! server error " });
  
     }
})

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({error:"product not found", message: "Product not found" });
    }

    res.status(200).json({data:product , message: "single product"});
  } catch (error) {
    res.status(500).json({error: error.message, message: "Server error" });
  }
});

module.exports = router;
