const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();


// ==========================
// PLACE ORDER
// ==========================
router.post("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    cart.items.forEach(item => {
      totalAmount += item.product.price * item.quantity;
    });

    const order = await Order.create({
      user: req.user,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalAmount
    });

    // clear cart after order
    cart.items = [];
    await cart.save();

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// GET USER ORDERS
// ==========================
router.get("/myOrders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user })
    .populate("items.product");

  res.json(orders);
});


// ==========================
// ADMIN: GET ALL ORDERS
// ==========================
router.get("/", protect, admin, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product");

  res.json(orders);
});

module.exports = router;
