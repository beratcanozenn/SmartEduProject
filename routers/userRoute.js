const authController = require("../controllers/authController");
const router = require("express").Router();

router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.loginUser);
module.exports = router;
