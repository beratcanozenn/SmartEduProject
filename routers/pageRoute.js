const pageController = require("../controllers/pageController");
const router = require("express").Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);

module.exports = router;
