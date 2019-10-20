
const express = require('express')
const Sentry = require('@sentry/node')
const cors = require('cors')
const compress = require('compression')
const helmet = require('helmet')

require('dotenv').config({ path: '.env' })

// connect to sentry
Sentry.init({
  dsn: process.env.SENTRY_API_KEY,
  environment: 'Production'
})

// importing routes
const homeRoute = require('./routes/home')
const getAnimeRoute = require('./routes/Anime/Anime/Get/GetAnime')
const getMostPopularAnimeRoute = require('./routes/Anime/MostPopular/Get/GetMostPopular')
const createListRoute = require('./routes/List/Create/CreateList')
const updateListRoute = require('./routes/List/Update/UpdateList')
const deleteListRoute = require('./routes/List/Delete/DeleteList')
const getListRoute = require('./routes/List/Get/GetList')
const getListsRoute = require('./routes/Account/Lists/Get/GetLists')
const authSignUp = require('./routes/Auth/SignUp/SignUp')
const authSignIn = require('./routes/Auth/SignIn/SignIn')
const searchAnimeRoute = require('./routes/Search/search')
const accountPhoneRoutes = require('./routes/Account/Phone/Phone')

// importting middleware and functions
// const validateList = require('./middleware/validateListInput')
const genericMiddleware = require('./middleware/List/BodyValidator')
const queryTypeString = require('./routes/Search/middleware')
const authMiddleware = require('./middleware/Auth/BodyValidator')
const accountMiddleware = require('./middleware/Account/BodyValidator')
const validateReq = require('./middleware/Account/BodyValidator')

// intializing express
const app = express()

// middleware
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.errorHandler())
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compress())

// db setup
require('./config/db')

// endpoints
app.get('/', homeRoute.home)

app.get(
  '/api/v0/anime/:animeId',
  getAnimeRoute.getAnime
)
app.get(
  '/api/v0/anime/popular/most',
  getMostPopularAnimeRoute.getMostPopular
)

app.get(
  '/api/v0/lists',
  accountMiddleware.checkHeaderAndBodyValue,
  getListsRoute.getLists
)
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
  '/api/v0/list/:listId',
  genericMiddleware.checkBodyValue,
  getListRoute.getList
)
app.delete(
  '/api/v0/list/:listId',
  validateReq.checkHeaderAndBodyValue,
  deleteListRoute.deleteList
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
  genericMiddleware.checkBodyValue,
  authSignUp.signupImplicit
)
app.post(
  '/api/v0/user/signin',
  authMiddleware.checkBodyValue,
  authSignIn.signin
)

module.exports = app
