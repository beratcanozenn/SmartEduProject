const categoryController = require("../controllers/categoryController");
const router = require("express").Router();

router.route("/").post(categoryController.createCategory);
module.exports = router;
