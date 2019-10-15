const check = require('check-types')

exports.checkBodyValue = async function (req, res, next) {
  const body = Object.values(req.body)
  if (check.string(body[0]) && check.string(body[1])) {
    return next()
  } else {
    return res.status(412).send({ message: 'invalid body' })
  }
}
