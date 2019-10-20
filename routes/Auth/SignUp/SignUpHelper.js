const User = require('../../../models/User')
const bcrypt = require('bcryptjs')
const validate = require('../../../common/validator')
const auth = require('../../../common/auth')
const createListHelper = require('../../List/Create/CreateListHelper')

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
      const jwtResult = await auth.getIdFromJWTToken(data.token)
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
      if (data.phoneNumber) {
        userDataObject.phoneNumber = data.phoneNumber
        userDataObject.carrier = data.carrier
      }
      if (newUser || generateNewId) {
        user = await new User(userDataObject).save()
        userId = user._id
      } else {
        user = await User.findOneAndUpdate(
          { _id: userId, email: null, phoneNumber: null },
          userDataObject
        )
      }
      jwtToken = await auth.generateJWTToken(userId, 30)
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

exports.signUpImplicitLogic = async function (data) {
  let successfullySignedUp = false
  let jwtToken = null
  let animeList = null
  try {
    const user = await (new User().save())
    if (!createListHelper.dataInvalid(data)) {
      animeList = await (
        (await createListHelper.generateAnimeListObject(user._id, data)).save()
      )
    }
    jwtToken = await auth.generateJWTToken(user._id, 1)
    successfullySignedUp = true
  } catch (exception) {
    console.error('Exception:', exception)
  }
  return { successfullySignedUp, animeList, jwtToken }
}

exports.bodyInvalid = function (body) {
  let errorMessage = null
  if (body.phoneNumber === true) {
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
