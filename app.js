/* Copyright (C) Keoni Murray - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Keoni Murray & Shane Austrie keonimurray45@gmail.com
 */

const express = require('express')
const compress = require('compression')

// importing routes
const homeRoute = require('./routes/home')
const createListRoute = require('./routes/List/Create/createList')
const updateListRoute = require('./routes/List/Update/updateList')
const deleteListRoute = require('./routes/List/Delete/deleteList')
const getListRoute = require('./routes/List/Get/getList')
const getListsRoute = require('./routes/Account/Lists/Get/getLists')
const authSignUp = require('./routes/auth/SignUp/signup')
const authSignIn = require('./routes/auth/SignIn/signIn')
const searchAnimeRoute = require('./routes/search/search')
const accountPhoneRoutes = require('./routes/Account/Phone/phone')

// importting middleware and functions
// const validateList = require('./middleware/validateListInput')
const genericMiddleware = require('./middleware/List/bodyValidator')
const queryTypeString = require('./routes/search/middleware')
const authMiddleware = require('./middleware/Auth/bodyValidator')
const accountMiddleware = require('./middleware/Account/bodyValidator')
const validateReq = require('./middleware/Account/bodyValidator')

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
  authSignUp.signupImplicit
)
app.post(
  '/api/v0/user/signin',
  authMiddleware.checkBodyValue,
  authSignIn.signin
)

module.exports = app
