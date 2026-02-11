const User = require("../models/User");

const admin = async (req, res, next) => {
  const user = await User.findById(req.user);

  if (user && user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access denied" });
  }
};

module.exports = admin;
