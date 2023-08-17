const Course = require("../models/Course");
const Category = require("../models/Category");

exports.getAllCourse = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }
    console.log(filter);
    const courses = await Course.find(filter).sort("-createdAt");
    console.log(courses);
    const categories = await Category.find({});

    res
      .status(200)
      .render("courses", { courses, categories, page_name: "courses" });
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
  try {
    const course = await Course.create(req.body);
    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};
