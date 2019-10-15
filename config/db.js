const mongoose = require('mongoose')
const assert = require('assert')

const url = process.env.db_url
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
mongoose.set('debug', true)

module.exports = mongoose.connection
