const courseController = require("../controllers/courseController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = require("express").Router();

router
  .route("/")
  .post(roleMiddleware(["Teacher", "Admin"]), courseController.createCourse);
router.route("/").get(courseController.getAllCourse);
router.route("/:slug").get(courseController.getCourse);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse);
module.exports = router;
