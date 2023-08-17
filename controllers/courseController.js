const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.getAllCourse = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      filter.name = "";
      filter.category = null;
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort("-createdAt")
      .populate("user");
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
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const categories = await Category.find({});
    const studentUser = await User.findById(req.session.userID);
    res.status(200).render("course", {
      studentUser,
      course,
      categories,
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
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });

    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.courses.push({ _id: req.body.course_id });
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.courses.pull({ _id: req.body.course_id });
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};
