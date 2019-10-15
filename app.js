const express = require("express");
const compress = require("compression");

// importing routes
const homeRoute = require("./routes/home");
const createListRoute = require("./routes/createList/createList");
const authSignUp = require("./routes/Auth/SignUp/SignUp");
const authSignIn = require("./routes/Auth/SignIn/SignIn");

// importting middleware and functions
const validateList = require("./middleware/validateListInput");
const authMiddleware = require("./middleware/auth/BodyValidator");

// intializing express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compress());

// db setup
require("dotenv").config();
require("./config/db");

// endpoints
app.get("/", homeRoute.home);
app.post(
  "/api/v0/create/new/list",
  validateList.validateListInput,
  createListRoute.createList
);
app.post(
  "/api/v2/user/signup",
  authMiddleware.checkBodyValue,
  authSignUp.signup
);
app.post(
  "/api/v2/user/signin",
  authMiddleware.checkBodyValue,
  authSignIn.signin
);

module.exports = app;
