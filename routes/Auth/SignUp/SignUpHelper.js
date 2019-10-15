const User = require('../../../models/user')
const shortId = require('shortid')
const bcrypt = require('bcryptjs')
const validate = require('../../../common/validator')
const JWT = require('jsonwebtoken')

const getIdFromJWTToken = async function (token) {
  const tokenResults = await JWT.verify(token, process.env.SECRECT, { algorithm: 'HS256' }, (error, decode) => {
    let id = null
    let newUser = false
    const expired = (error && error.message === 'jwt expired')
    if (!error && !expired) id = decode._id
    if (expired) {
      newUser = true
      id = shortId.generate()
    }
    return { newUser, id }
  })
  return tokenResults
}

exports.signUpLogic = async function (data) {
  let successfullySignedUp = false
  let jwtToken = null
  let newUser = false
  let userId = null

  try {
    if (data.token) {
      const tokenResults = getIdFromJWTToken(data.token)
      newUser = tokenResults.newUser
      userId = tokenResults.userId
    } else {
      userId = shortId.generate()
    }

    if (userId) {
      let user = null
      const userDataObject = {
        userId: userId,
        userEmail: data.email,
        password: await bcrypt.hash(data.password, 10),
        isSignedUp: true
      }
      if (data.hasPhoneNumber) {
        userDataObject.phoneNumber = data.phoneNumber
      }
      if (newUser) {
        user = await User.findOneAndUpdate(
          { userId: userId },
          userDataObject
        )
      } else {
        user = new User(userDataObject)
      }
      await user.save()
      jwtToken = JWT.sign(
        { _id: userId },
        process.env.SECRECT,
        { algorithm: 'HS256' },
        { expiresIn: '30 days' }
      )
      successfullySignedUp = true
    }
  } catch (exception) {
    console.log('Exception:', exception)
  }

  return { successfullySignedUp, jwtToken }
}

exports.signUpImplicitLogic = function () {
  let successfullySignedUp = false
  let jwtToken = null
  try {
    const userId = shortId.generate()
    new User({ userId: userId }).save()
    jwtToken = JWT.sign(
      { _id: userId },
      process.env.SECRECT,
      { algorithm: 'HS256' },
      { expiresIn: '24 hours' }
    )
    successfullySignedUp = true
  } catch (exception) {
    console.log('Exception:', exception)
  }
  return { successfullySignedUp, jwtToken }
}

exports.bodyValid = async function (body) {
  const validPhoneNumber = await validate.validatePhoneNumber(body.phoneNumber)
  const validCarrier = await validate.validateCarrier(body.carrier)
  let errorMessage = null
  if (body.hasPhoneNumber === true) {
    if (!validPhoneNumber || !validCarrier) {
      errorMessage = (
        !validPhoneNumber && !validCarrier ? 'Invalid phone number and carrier' : (
          !validPhoneNumber ? 'Invalid phone number' : 'Invalid carrier'
        )
      )
    }
  }
  return errorMessage
}
