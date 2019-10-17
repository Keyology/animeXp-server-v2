const express = require('express')
const compress = require('compression')

// importing routes
const homeRoute = require('./routes/home')
const createListRoute = require('./routes/List/CreateList/CreateList')
const authSignUp = require('./routes/Auth/SignUp/SignUp')
const authSignIn = require('./routes/Auth/SignIn/SignIn')
const searchAnimeRoute = require('./routes/Search/search')
const accountPhoneRoutes = require('./routes/Account/Phone/Phone')

// importting middleware and functions
const validateList = require('./middleware/validateListInput')
const queryTypeString = require('./routes/Search/middleware')
const authMiddleware = require('./middleware/auth/BodyValidator')
const accountMiddleware = require('./middleware/account/BodyValidator')

// intializing express
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compress())

// db setup
require('dotenv').config({ path: '.env' })
require('./config/db')

// endpoints
app.get('/', homeRoute.home)
app.post(
  '/api/v0/create/new/list',
  validateList.validateListInput,
  createListRoute.createList
)
app.get(
  '/api/v0/search/:query',
  queryTypeString.checkIfQueryIsString,
  searchAnimeRoute.searchForAnime
)
app.post(
  '/api/v0/user/signup',
  authMiddleware.checkBodyValue,
  authSignUp.signup
)
app.post(
  '/api/v0/user/signup/implicit',
  authSignUp.signupImplicit
)
app.post(
  '/api/v0/user/signin',
  authMiddleware.checkBodyValue,
  authSignIn.signin
)
app.get(
  '/api/v0/user/phone',
  accountMiddleware.checkHeaderAndBodyValue,
  accountPhoneRoutes.getPhoneAndCarrier
)

app.post(
  '/api/v0/user/phone',
  accountMiddleware.checkHeaderAndBodyValue,
  accountPhoneRoutes.setPhoneAndCarrier
)

module.exports = app
