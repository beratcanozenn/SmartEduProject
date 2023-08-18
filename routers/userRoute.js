const authController = require("../controllers/authController");
const User = require("../models/User");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { body } = require("express-validator");
router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("Please Enter Your Name"),
    body("email")
      .isEmail()
      .withMessage("Please Enter Valid email")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email is already exist!");
          }
        });
      }),
    body("password").not().isEmpty().withMessage("Please Enter Yor Password"),
  ],
  authController.createUser
);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);
module.exports = router;
