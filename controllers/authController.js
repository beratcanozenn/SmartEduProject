const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "Success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    req.session.userID = user._id;
    if (!user) {
      res.status(400).send("kullanici yok");
    }
    const same = await bcrypt.compare(password, user.password);
    if (same) {
      res.status(200).redirect("/");
    }
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
