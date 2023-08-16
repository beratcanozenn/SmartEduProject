const Course = require("../models/Course");

exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).render("courses", { courses, page_name: "courses" });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render("course", {
      course,
      page_name: course.name,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};

exports.createCourse = async (req, res) => {
  const { name, description, createdAt } = req.body;
  const course = new Course({
    name,
    description,
    createdAt,
  });

  try {
    await course.save();
    res.status(201).json({
      status: "Success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};
