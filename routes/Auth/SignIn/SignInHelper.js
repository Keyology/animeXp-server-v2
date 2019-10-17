const User = require('../../../models/user')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

exports.signInLogic = async function (data) {
  let successfullySignedIn = false
  let jwtToken = null

  const user = await User.findOne({ email: data.email })
  if (user !== null) {
    const bcryptResult = await bcrypt.compare(data.password, user.password, (err, result) => {
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
