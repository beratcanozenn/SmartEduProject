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
    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // User Session
            res.status(200).send("You are logged in");
          }
        });
      }
    });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("kullanici yok");
    }
    const same = await bcrypt.compare(password, user.password);
    if (same) {
      res.status(200).send("login");
    }
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};
