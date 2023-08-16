const pageController = require("../controllers/pageController");
const router = require("express").Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(pageController.getRegisterPage);

module.exports = router;
