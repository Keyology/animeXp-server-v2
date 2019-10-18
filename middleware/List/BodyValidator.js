const check = require('check-types')

exports.checkBodyValue = async function (req, res, next) {
  const validBody = check.object(req.body)
  if (validBody) {
    return next()
  } else {
    const errorMessage = 'Invalid body'
    return res.status(412).send({ message: errorMessage })
  }
}
