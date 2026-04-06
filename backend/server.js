const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/auth", authRoutes);

const protect = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "You are authorized", userId: req.user });
});

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const adminProductRoutes = require("./routes/adminProductRoutes");
app.use("/api/admin/products", adminProductRoutes);

const orderRoute = require("./routes/orderRoutes");
app.use("/api/orders", orderRoute);


// 🔥 ADD THIS HERE (IMPORTANT)
app.use((err, req, res, next) => {
  console.log("🔥 REAL ERROR:", err);

  res.status(500).json({
    message: err.message,
  });
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});