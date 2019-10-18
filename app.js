const express = require('express')
const compress = require('compression')

// importing routes
const homeRoute = require('./routes/home')
const createListRoute = require('./routes/List/Create/CreateList')
const updateListRoute = require('./routes/List/Update/UpdateList')
const authSignUp = require('./routes/Auth/SignUp/SignUp')
const authSignIn = require('./routes/Auth/SignIn/SignIn')
const searchAnimeRoute = require('./routes/Search/search')
const accountPhoneRoutes = require('./routes/Account/Phone/Phone')
const deleteListRoute = require('./routes/List/DeleteList/deleteList')

// importting middleware and functions
// const validateList = require('./middleware/validateListInput')
const queryTypeString = require('./routes/Search/middleware')
const authMiddleware = require('./middleware/auth/BodyValidator')
const accountMiddleware = require('./middleware/account/BodyValidator')
const validateReq = require('./middleware/Account/BodyValidator')

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
  '/api/v0/list',
  accountMiddleware.checkHeaderAndBodyValue,
  createListRoute.createList
)
app.patch(
  '/api/v0/list',
  accountMiddleware.checkHeaderAndBodyValue,
  updateListRoute.updateList
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

app.delete(
  '/api/v0/remove/:listId',
  validateReq.checkHeaderAndBodyValue,
  deleteListRoute.deleteList
)

module.exports = app
