const mongoose = require('mongoose')
const assert = require('assert')

const url = process.env.DB_URL
mongoose.Promise = global.Promise
mongoose.connect(
  url,
  {
    useNewUrlParser: true
  },
  (err, db) => {
    assert.strictEqual(null, err)
    console.log('Connected successfully to database')

    // db.close(); turn on for testing
  }
)
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection Error:')
)
mongoose.set('debug', false)

module.exports = mongoose.connection
