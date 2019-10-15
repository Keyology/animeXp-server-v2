const helper = require('./SignUpHelper')

exports.signupImplicit = async function (req, res) {
  let successfullySignedUp = false
  let jwtToken = null
  const signUpResults = helper.signUpImplicitLogic()
  successfullySignedUp = signUpResults.successfullySignedUp
  jwtToken = signUpResults.jwtToken
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
    userId: req.body.user_id,
    hasPhoneNumber: req.body.has_phone_number,
    carrier: req.body.carrier,
    phoneNumber: req.body.phone_number,
    token: req.body.token
  }
  let successfullySignedUp = false
  let jwtToken = null
  const errorMessage = helper.bodyValid(body)
  if (errorMessage) return res.status(412).send({ message: errorMessage })
  const signUpResults = helper.signUpLogic(body)
  successfullySignedUp = signUpResults.successfullySignedUp
  jwtToken = signUpResults.jwtToken

  if (successfullySignedUp) {
    return res.json({ token: jwtToken }).status(200)
  } else {
    return res.status(503).send({ message: 'Error signing up user' })
  }
}
