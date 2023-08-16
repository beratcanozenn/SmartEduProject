const authController = require("../controllers/authController");
const router = require("express").Router();

router.route("/signup").post(authController.createUser);
module.exports = router;
