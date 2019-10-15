const User = require('../models/user')
const bcrypt = require('bcryptjs')
const validate = require('../../common/validator')
const JWT = require('jsonwebtoken')

exports.signInLogic = async function (data) {
  let successfullySignedIn = false
  let jwtToken = null

  const user = await User.findOne({ email: data.email })
  if (user !== null) {
    const bcryptResult = bcrypt.compare(data.password, user.password, (err, result) => {
      const correct = false
      let token = null
      if (!err) {
        token = JWT.sign(
          { _id: user._id },
          process.env.SECRECT,
          { algorithm: 'HS256' },
          { expiresIn: '30 days' }
        )
      }
      return { correct, token }
    })
    successfullySignedIn = bcryptResult.correct
    jwtToken = bcryptResult.token
  }
  return { successfullySignedIn, jwtToken }
}

exports.bodyValid = async function (body) {
  const validEmail = await validate.validateEmail(body.email)
  const validPassword = await validate.validatePassword(body.password)
  let errorMessage = null
  if (!validEmail || !validPassword) {
    errorMessage = (
      !validEmail && !validPassword ? 'Invalid email and password' : (
        !validEmail ? 'Invalid email' : 'Invalid password'
      )
    )
  }
  return errorMessage
}
