const check = require('check-types')

exports.checkIfQueryIsString = async function (req, res, next) {
  const query = req.params.query
  return check.string(query) ? next() : res.status(412).send({ message: 'invalid query' })
}
