const express = require('express')
const compress = require('compression')
const Agendash = require('agendash')

// importing routes
const homeRoute = require('./routes/home')
const createListRoute = require('./routes/createList/createList')
const searchAnimeRoute = require('./routes/search/search')

// importting middleware and functions
const validateList = require('./middleware/validateListInput')
const queryTypeString = require('./routes/search/middleware')

// intializing express
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compress())

// db setup
require('dotenv').config({ path: '.env' })
require('./config/db')
// const agenda = require('./jobs/agenda')

// app.use('/dash', Agendash(agenda.agenda))

// endpoints
app.get('/', homeRoute.home)
app.post('/api/v0/create/new/list', validateList.validateListInput, createListRoute.createList)
app.get('/api/v0/search/:query', queryTypeString.checkIfQueryIsString, searchAnimeRoute.searchForAnime)

module.exports = app
