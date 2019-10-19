const check = require('check-types')
const validator = require('../../common/validator')

exports.checkHeaderAndBodyValue = async function (req, res, next) {  
  const validBody = check.object(req.body)
  const validHeader = check.object(req.headers)
  const validToken = validHeader ? validator.hasToken(req.headers.token) : false
  if (validBody & validHeader && validToken) {
    return next()
  } else {
    let errorMessage = null
    if (!validBody) errorMessage = 'Invalid body'
    if (!validToken) errorMessage = 'Invalid token'
    if (!validHeader) errorMessage = 'Invalid header'

    return res.status(412).send({ message: errorMessage })
  }
}
