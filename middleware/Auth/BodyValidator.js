const check = require('check-types')
const validator = require('../../common/validator')

exports.checkBodyValue = async function (req, res, next) {
  const validBody = check.object(req.body)
  const validEmail = validBody ? validator.validateEmail(req.body.email) : false
  const validPassword = validBody ? validator.validatePassword(req.body.password) : false
  const validHasPhoneNumberBoolean = validBody ? validator.validateHasPhoneNumber(req.body.has_phone_number) : false
  if (validBody && validEmail && validPassword && validHasPhoneNumberBoolean) {
    return next()
  } else {
    let errorMessage = null
    if (!validHasPhoneNumberBoolean) errorMessage = 'Please remove `has_phone_number` field or simply use valid boolean value'
    if (!validEmail) errorMessage = 'Invalid email'
    if (!validPassword) errorMessage = 'Invalid password. Password has to be minimum 7 characters long'
    if (!validEmail && !validPassword) errorMessage = 'Invalid email and password. Password has to be minimum 7 characters long'
    if (!validBody) errorMessage = 'Invalid body'

    return res.status(412).send({ message: errorMessage })
  }
}
