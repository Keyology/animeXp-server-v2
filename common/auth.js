const JWT = require('jsonwebtoken')

exports.getIdFromJWTToken = async function (token) {
  const tokenResults = await JWT.verify(
    token,
    process.env.SECRECT,
    { algorithm: 'HS256' },
    (error, decode) => {
      let generateNewId = false
      let id = null
      const expired = (error && error.message === 'jwt expired')
      if (!error && !expired) id = decode._id
      if (expired) {
        generateNewId = true
      }
      return { id, generateNewId }
    })
  return tokenResults
}

exports.generateJWTToken = function (userId, days) {
  return JWT.sign(
    { _id: userId },
    process.env.SECRET,
    {
      algorithm: 'HS256',
      expiresIn: String(days) + 'd'
    }
  )
}
