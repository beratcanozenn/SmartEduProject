const pageController = require("../controllers/pageController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");
const router = require("express").Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/contact").get(pageController.getContactPage);
router.route("/contact").post(pageController.senEmail);
router
  .route("/register")
  .get(redirectMiddleware, pageController.getRegisterPage);
router.route("/login").get(redirectMiddleware, pageController.getLoginPage);

module.exports = router;
