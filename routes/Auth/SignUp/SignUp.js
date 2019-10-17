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
    token: req.headers ? req.headers.token : null
  }
  const bodyInvalidMessage = helper.bodyValid(body)
  if (bodyInvalidMessage) return res.status(412).send({ message: bodyInvalidMessage })
  const { successfullySignedUp, jwtToken, errorMessage } = await helper.signUpLogic(body)
  if (successfullySignedUp) {
    return res.json({ token: jwtToken }).status(200)
  } else {
    return res.status(503).send({ message: errorMessage })
  }
}
