const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (!req.session.userID) {
    console.log("User not authenticated");
    return res.redirect("/login");
  }
  next();
  try {
  } catch (error) {
    console.log("Error finding user:", error);
    res.redirect("/login");
  }
};
