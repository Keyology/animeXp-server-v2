const User = require('../../../models/user')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

exports.signInLogic = async function (data) {
  let correctPassword = false
  let jwtToken = null
  let errorMessage = 'Error signing up user'

  try {
    const user = await User.findOne({ userEmail: data.email })
    console.log(user)
    if (user !== null) {
      correctPassword = await bcrypt.compare(data.password, user.password)
      console.log('correctPassword', correctPassword)
      if (correctPassword) {
        jwtToken = await JWT.sign(
          { _id: user._id },
          process.env.SECRET,
          {
            algorithm: 'HS256',
            expiresIn: '30d'
          }
        )
      } else {
        errorMessage = 'Incorrect password'
      }
    } else {
      errorMessage = 'Incorrect email'
    }
  } catch (exception) {
    console.log(exception)
  }
  return { jwtToken, errorMessage }
}
