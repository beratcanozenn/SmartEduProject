const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log("Berat");
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const same = await bcrypt.compare(password, user.password);
      if (same) {
        req.session.userID = user._id;
        res.status(200).redirect("/users/dashboard");
      } else {
        res.status(401).json({
          status: "false",
          error: "İnvalid Password",
        });
      }
    } else {
      res.status(404).json({
        status: "False",
        error: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate('courses');
  const categories = await Category.find({});
  const courses = await Course.find({ user: req.session.userID });
  res
    .status(200)
    .render("dashboard", { page_name: "dashboard", user, categories, courses });
};

