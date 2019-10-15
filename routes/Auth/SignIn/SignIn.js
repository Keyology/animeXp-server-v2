const helper = require('./SignInHelper')

exports.signIn = async function (req, res) {
  const body = {
    email: req.body.email,
    password: req.body.password
  }
  let successfullySignedIn = false
  let jwtToken = null
  const errorMessage = helper.bodyValid(body)
  if (errorMessage) {
    return res.status(412).send({ message: errorMessage })
  }
  const signInLogicResult = helper.signInLogic(body)
  successfullySignedIn = signInLogicResult.successfullySignedIn
  jwtToken = signInLogicResult.jwtToken

  if (successfullySignedIn) {
    return res.json({ token: jwtToken }).status(200)
  } else {
    return res.status(503).send({ message: 'Error signing-in user' })
  }
}
