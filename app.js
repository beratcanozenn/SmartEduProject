const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routers/pageRoute");
const courseRoute = require("./routers/courseRoute");
const app = express();

// Connect DB
mongoose
  .connect("mongodb://localhost/smartedu-db")
  .then(() => console.log("DB Connected Succesfuly"));

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
