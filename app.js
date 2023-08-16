const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const pageRoute = require("./routers/pageRoute");
const courseRoute = require("./routers/courseRoute");
const categoryRoute = require("./routers/categoryRoute");
const userRouter = require("./routers/userRoute");
const app = express();

// Connect DB
mongoose
  .connect("mongodb://localhost/smartedu-db")
  .then(() => console.log("DB Connected Succesfuly"));

//Template Engine
app.set("view engine", "ejs");

// Global Variable
global.userIN = null;

//Middlewares

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/smartedu-db" }),
  })
);
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

// Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
