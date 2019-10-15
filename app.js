const express = require('express')
const compress = require('compression')

// importing routes
const homeRoute = require('./routes/home')
const createListRoute = require('./routes/createList/createList')
<<<<<<< HEAD
const authSignUp = require('./routes/Auth/SignUp/SignUp')
const authSignIn = require('./routes/Auth/SignIn/SignIn')

// importting middleware and functions
const validateList = require('./middleware/validateListInput')
const authMiddleware = require('./middleware/auth/BodyValidator')
=======
const searchAnimeRoute = require('./routes/search/search')

// importting middleware and functions
const validateList = require('./middleware/validateListInput')
const queryTypeString = require('./routes/search/middleware')
>>>>>>> 2e4bea08245216eb6bf94532d53b3808ef37a6d6

// intializing express
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compress())

// db setup
require('dotenv').config()
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
  searchAnimeRoute.searchDbForAnime
)
app.post(
  '/api/v2/user/signup',
  authMiddleware.checkBodyValue,
  authSignUp.signup
)
app.post(
  '/api/v0/user/signup/implicit',
  authMiddleware.checkBodyValue,
  authSignUp.signupImplicit
)
app.post(
  '/api/v0/user/signin',
  authMiddleware.checkBodyValue,
  authSignIn.signin
)

module.exports = app
