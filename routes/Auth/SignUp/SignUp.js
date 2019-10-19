const helper = require('./SignUpHelper')

exports.signupImplicit = async function (req, res) {
  const data = {
    listName: req.body.list_name,
    listDescription: req.body.list_description,
    listItems: req.body.list_items
  }
  const { successfullySignedUp, animeList, jwtToken } = await helper.signUpImplicitLogic(data)
  if (successfullySignedUp) {
    return res.json({ token: jwtToken, animeList }).status(200)
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
  const bodyInvalidMessage = helper.bodyInvalid(body)
  if (bodyInvalidMessage) return res.status(412).send({ message: bodyInvalidMessage })
  const { successfullySignedUp, jwtToken, errorMessage } = await helper.signUpLogic(body)
  if (successfullySignedUp) {
    return res.json({ token: jwtToken }).status(200)
  } else {
    return res.status(503).send({ message: errorMessage })
  }
}
