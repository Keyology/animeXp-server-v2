const User = require('../../../models/user')
const bcrypt = require('bcryptjs')
const auth = require('../../../common/auth')

exports.signInLogic = async function (data) {
  let correctPassword = false
  let jwtToken = null
  let errorMessage = 'Error signing up user'

  try {
    const user = await User.findOne({ userEmail: data.email })
    if (user !== null) {
      correctPassword = await bcrypt.compare(data.password, user.password)
      if (correctPassword) {
        jwtToken = await auth.generateJWTToken(user._id, 30)
      } else {
        errorMessage = 'Incorrect password'
      }
    } else {
      errorMessage = 'Incorrect email'
    }
  } catch (exception) {
    console.error(exception)
  }
  return { jwtToken, errorMessage }
}
