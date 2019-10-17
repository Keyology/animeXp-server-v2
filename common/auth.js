const JWT = require('jsonwebtoken')

exports.getIdFromJWTToken = async function (token) {
  const tokenResults = await JWT.verify(
    token,
    process.env.SECRET,
    { algorithm: 'HS256' },
    (error, decode) => {
      let generateNewId = false
      let id = null
      if (error) {
        console.error('Error:', error)
        generateNewId = (error.message === 'jwt expired')
      } else {
        id = decode._id
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
