const check = require('check-types')
const validator = require('../../common/validator')

exports.checkBodyValue = async function (req, res, next) {
  const validBody = check.object(req.body)
  const validEmail = validator.validateEmail(req.body.email)
  const validPassword = validator.validatePassword(req.body.password)
  if (validBody && validEmail && validPassword) {
    return next()
  } else {
    let errorMessage = null
    if (!validEmail) errorMessage = 'Invalid email'
    if (!validPassword) errorMessage = 'Invalid password. Password has to be minimum 7 characters long'
    if (!validEmail && !validPassword) errorMessage = 'Invalid email and password. Password has to be minimum 7 characters long'
    if (!validBody) errorMessage = 'Invalid body'

    return res.status(412).send({ message: errorMessage })
  }
}
