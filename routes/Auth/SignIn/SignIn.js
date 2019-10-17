const helper = require('./SignInHelper')

exports.signin = async function (req, res) {
  const body = {
    email: req.body.email,
    password: req.body.password
  }
  const { jwtToken, errorMessage } = await helper.signInLogic(body)
  console.log('jwtToken', jwtToken, 'errorMessage', errorMessage)

  if (jwtToken) {
    return res.json({ token: jwtToken }).status(200)
  } else {
    return res.status(503).send({ message: errorMessage })
  }
}
