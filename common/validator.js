const check = require('check-types')
const validator = require('validator')
const carriersSet = require('../static/Carriers.js')

exports.validateEmail = function (email) {
  let valid = false
  try {
    if (email && check.string(email) && validator.isEmail(email)) {
      valid = true
    }
  } catch (error) {
    console.error(error)
  }
  return valid
}

exports.validatePassword = function (password) {
  let valid = false
  try {
    if (password && check.string(password) && password.length >= 7) {
      valid = true
    }
  } catch (error) {
    console.error(error)
  }
  return valid
}

exports.validateUserName = function (userName) {
  let valid = false
  try {
    if (userName && check.string(userName) && userName.replace(' ', '') !== '') {
      valid = true
    }
  } catch (error) {
    console.error(error)
  }
  return valid
}

exports.validatePhoneNumber = function (phoneNumber) {
  let valid = false
  try {
    if (phoneNumber && check.number(phoneNumber) && validator.isMobilePhone(phoneNumber)) {
      valid = true
    }
  } catch (error) {
    console.error(error)
  }
  return valid
}

exports.validateCarrier = function (carrier) {
  let valid = false
  try {
    if (carrier && check.string(carrier) && carriersSet.has(carrier)) {
      valid = true
    }
  } catch (error) {
    console.error(error)
  }
  return valid
}
