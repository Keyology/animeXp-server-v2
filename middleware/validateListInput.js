const check = require('check-types')
const validator = require('validator')

exports.validateListInput = async function (req, res, next) {
  const body = [req.body.list, req.body.name, req.body.description]
  // Check input type

  const validateListIsTypeArray = check.array(body[0])
  const validateNameIsTypeString = check.string(body[1])
  const validateDescriptionIsTypeString = check.string(body[2])

  // check if list has a name that has only letters
  const validateNameHasLetters = validator.isAlpha(validator.blacklist(body[1], ' '))

  // check if input is valid
  if (validateListIsTypeArray && validateNameHasLetters && validateNameIsTypeString && validateDescriptionIsTypeString) {
    return next()
  }
  return res.status(412).send({ message: 'invalid input' })
}
