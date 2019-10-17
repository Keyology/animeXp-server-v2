const helper = require('./SignUpHelper')

exports.signupImplicit = async function (req, res) {
  const { successfullySignedUp, jwtToken } = await helper.signUpImplicitLogic()
  if (successfullySignedUp) {
    return res.json({ token: jwtToken }).status(200)
  } else {
    return res.status(503).send({ message: 'Error signing up user' })
  }
}

exports.signup = async function (req, res) {
  const body = {
    email: req.body.email,
    password: req.body.password,
    hasPhoneNumber: req.body.has_phone_number,
    carrier: req.body.carrier,
    phoneNumber: req.body.phone_number,
    token: req.body.token
  }
  const bodyInvalidMessage = helper.bodyValid(body)
  console.log('-2', bodyInvalidMessage)
  if (bodyInvalidMessage) return res.status(412).send({ message: bodyInvalidMessage })
  console.log('-1')
  const { successfullySignedUp, jwtToken, errorMessage } = await helper.signUpLogic(body)
  console.log(successfullySignedUp, jwtToken)
  if (successfullySignedUp) {
    return res.json({ token: jwtToken }).status(200)
  } else {
    return res.status(503).send({ message: errorMessage })
  }
}
