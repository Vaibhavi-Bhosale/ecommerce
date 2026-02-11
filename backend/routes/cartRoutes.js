const express = require("express");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================
// ADD TO CART
// ==========================
router.post("/addToCart", protect, async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user });

    if (!cart) {
      cart = await Cart.create({
        user: req.user,
        items: [{ product: productId, quantity: 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// REMOVE ITEM FROM CART
// ==========================
router.delete("/removeFromCart", protect, async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    // 🔑 MAIN LOGIC
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;   // quantity kam
    } else {
      cart.items.splice(itemIndex, 1);        // poora item remove
    }

    await cart.save();

    res.json({ message: "Item updated", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// ==========================
// DECREASE QUANTITY (-1)
// ==========================
// router.put("/decreaseQuantity", protect, async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const cart = await Cart.findOne({ user: req.user });

//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const itemIndex = cart.items.findIndex(
//       item => item.product.toString() === productId
//     );

//     if (itemIndex === -1) {
//       return res.status(404).json({ message: "Item not in cart" });
//     }

//     if (cart.items[itemIndex].quantity > 1) {
//       cart.items[itemIndex].quantity -= 1;
//     } else {
//       cart.items.splice(itemIndex, 1);
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// ==========================
// CLEAR CART
// ==========================
router.delete("/clear", protect, async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user },
      { items: [] },
      { new: true }
    );

    res.json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// GET USER CART
// ==========================
router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user })
    .populate("items.product");

  res.json(cart);
});

module.exports = router;
