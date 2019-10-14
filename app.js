const express = require('express')
const index = require('./routes/index')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', index.serverActive)

module.exports = app
