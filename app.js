const express = require('express')
const compress = require('compression')
const index = require('./routes/index')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compress())

require('dotenv').config()
require('./config/db')

app.get('/', index.serverActive)

module.exports = app
