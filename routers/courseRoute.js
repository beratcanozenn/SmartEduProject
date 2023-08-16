const courseController = require("../controllers/courseController");
const router = require("express").Router();

router.route("/").post(courseController.createCourse);
router.route("/").get(courseController.getAllCourse);
router.route("/:slug").get(courseController.getCourse);
module.exports = router;
