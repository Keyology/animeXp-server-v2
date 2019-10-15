const express = require('express')
const compress = require('compression')

// importing routes
const homeRoute = require('./routes/home')
const createListRoute = require('./routes/createList/createList')

// importting middleware and functions
const validateList = require('./middleware/validateListInput')

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
app.post('/api/v0/create/new/list', validateList.validateListInput, createListRoute.createList)

module.exports = app
