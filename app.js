const express = require("express");
const compress = require("compression");
const index = require("./routes/index");
const authSignUp = require("./routes/Auth/SignUp/SignUp");
const authSignIn = require("./routes/Auth/SignIn/SignIn");
const authMiddleware = require("./middleware/auth/BodyValidator");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compress());

require("dotenv").config();
require("./config/db");

app.get("/", index.serverActive);
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
