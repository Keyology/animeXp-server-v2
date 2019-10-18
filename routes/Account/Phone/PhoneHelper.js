const User = require('../../../models/User')
const validate = require('../../../common/validator')
const auth = require('../../../common/auth')

exports.getPhoneAndCarrierLogic = async function (data) {
  let phoneNumber = null
  let carrier = null
  let errorMessage = 'Error getting carrier and phone number'
  try {
    const { id, generateNewId } = await auth.getIdFromJWTToken(data.token)
    if (id) {
      const user = await User.findOne({ _id: id })
      if (user) {
        phoneNumber = user.phoneNumber
        carrier = user.carrier
        errorMessage = !phoneNumber || !carrier ? 'No phone number and carrier set' : errorMessage
      } else {
        errorMessage = 'User not found'
      }
    } else {
      errorMessage = generateNewId ? 'Token expired' : errorMessage
    }
  } catch (exception) {
    console.error('Exception:', exception)
  }

  return { phoneNumber, carrier, errorMessage }
}

exports.setPhoneAndCarrierLogic = async function (data) {
  let success = false
  let errorMessage = 'Error getting carrier and phone number'
  console.log('setPhoneAndCarrierLogic')
  try {
    const { id, generateNewId } = await auth.getIdFromJWTToken(data.token)
    if (id) {
      await User.findOneAndUpdate(
        { _id: id },
        {
          phoneNumber: data.phoneNumber,
          carrier: data.carrier
        }
      )
      success = true
    } else {
      errorMessage = generateNewId ? 'Token expired' : errorMessage
    }
  } catch (exception) {
    console.error('Exception:', exception)
  }

  return { success, phoneNumber: data.phoneNumber, carrier: data.carrier, errorMessage }
}

exports.bodyValid = function (body) {
  let errorMessage = null
  const validPhoneNumber = validate.validatePhoneNumber(body.phoneNumber)
  const validCarrier = validate.validateCarrier(body.carrier)
  if (!validPhoneNumber || !validCarrier) {
    errorMessage = (
      !validPhoneNumber && !validCarrier ? 'Invalid phone number and carrier' : (
        !validPhoneNumber ? 'Invalid phone number' : 'Invalid carrier'
      )
    )
  }
  return errorMessage
}
