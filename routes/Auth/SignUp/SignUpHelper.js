const User = require('../../../models/user')
const bcrypt = require('bcryptjs')
const validate = require('../../../common/validator')
const JWT = require('jsonwebtoken')

const getIdFromJWTToken = async function (token) {
  const tokenResults = await JWT.verify(token, process.env.SECRECT, { algorithm: 'HS256' }, (error, decode) => {
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

exports.signUpLogic = async function (data) {
  let userId = null
  let newUser = true
  let generateNewId = false
  let successfullySignedUp = false
  let jwtToken = null
  let errorMessage = 'Error signing up user'

  try {
    if (data.token) {
      newUser = false
      const jwtResult = await getIdFromJWTToken(data.token)
      userId = jwtResult.id
      generateNewId = jwtResult.generateNewId
    }
    if (userId || newUser === true || generateNewId === true) {
      let user = null
      const userDataObject = {
        userEmail: data.email,
        password: await bcrypt.hash(data.password, 10),
        isSignedUp: true
      }
      if (data.hasPhoneNumber) {
        userDataObject.phoneNumber = data.phoneNumber
      }
      if (newUser || generateNewId) {
        user = await new User(userDataObject).save()
        userId = user.userId
      } else {
        user = await User.findOneAndUpdate(
          { _id: userId, email: null, phoneNumber: null },
          userDataObject
        )
      }
      jwtToken = JWT.sign(
        { _id: userId },
        process.env.SECRET,
        {
          algorithm: 'HS256',
          expiresIn: '30d'
        }
      )
      successfullySignedUp = true
    }
  } catch (exception) {
    console.error('Exception:', exception)
    const error = String(exception).toLowerCase()
    if (error.includes('email')) {
      errorMessage = 'Email already registered'
    }
    if (error.includes('phonenumber')) {
      errorMessage = 'Phone number already registered'
    }
  }
  return { successfullySignedUp, jwtToken, errorMessage }
}

exports.signUpImplicitLogic = async function () {
  let successfullySignedUp = false
  let jwtToken = null
  try {
    const user = await new User().save()
    jwtToken = JWT.sign(
      { _id: user._id },
      process.env.SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '24 h'
      }
    )
    successfullySignedUp = true
  } catch (exception) {
    console.error('Exception:', exception)
  }
  return { successfullySignedUp, jwtToken }
}

exports.bodyValid = function (body) {
  let errorMessage = null
  if (body.hasPhoneNumber === true) {
    const validPhoneNumber = validate.validatePhoneNumber(body.phoneNumber)
    const validCarrier = validate.validateCarrier(body.carrier)
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
