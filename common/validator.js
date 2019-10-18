const check = require('check-types')
const validator = require('validator')
const Carriers = require('../static/Carriers.js')

exports.hasToken = function (token) {
  let valid = false
  try {
    if (token && check.string(token) && token.length > 0) {
      valid = true
    }
  } catch (error) {
    console.error('Error:', error)
  }
  return valid
}

exports.validateEmail = function (email) {
  let valid = false
  try {
    if (email && check.string(email) && validator.isEmail(email)) {
      valid = true
    }
  } catch (error) {
    console.error('Error:', error)
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
    console.error('Error:', error)
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
    console.error('Error:', error)
  }
  return valid
}

exports.validateHasPhoneNumber = function (hasPhoneNumber) {
  let valid = false
  try {
    if (!hasPhoneNumber || check.boolean(hasPhoneNumber)) {
      valid = true
    }
  } catch (error) {
    console.error('Error:', error)
  }
  return valid
}

exports.validatePhoneNumber = function (phoneNumber) {
  let valid = false
  try {
    if (phoneNumber && check.string(phoneNumber) && validator.isMobilePhone(phoneNumber)) {
      valid = true
    }
  } catch (error) {
    console.error('Error:', error)
  }
  return valid
}

exports.validateCarrier = function (carrier) {
  let valid = false
  try {
    if (carrier && check.string(carrier) && Carriers.CarrierSet.has(carrier)) {
      valid = true
    }
  } catch (error) {
    console.error('Error:', error)
  }
  return valid
}

exports.validateListName = function (listName) {
  let valid = false
  try {
    if (listName && check.string(listName) && listName.replace(' ', '').length > 0) {
      valid = true
    }
  } catch (except) {
    console.error('Except:', except)
  }
  return valid
}

exports.validateListDescription = function (listDescription, canBeEmpty = true) {
  let valid = false
  try {
    if ((listDescription || listDescription === '') && check.string(listDescription)) {
      if (canBeEmpty || (listDescription.replace(' ', '').length > 0)) {
        valid = true
      }
    }
  } catch (except) {
    console.error('Except:', except)
  }
  console.log('valid', valid)
  return valid
}

exports.validateListItems = function (listItems, canBeEmpty = false) {
  let valid = false
  try {
    if (listItems && check.arrayLike(listItems)) {
      if (canBeEmpty && check.emptyArray(listItems.length)) {
        valid = true
      } else {
        valid = true
        let item
        for (item of listItems) {
          if (!item || !check.string(item)) {
            valid = false
            break
          }
        }
      }
    }
  } catch (except) {
    console.error('Except:', except)
  }
  return valid
}

exports.validateListId = function (listId) {
  let valid = false
  try {
    if (listId && check.string(listId) && listId.length > 0) {
      valid = true
    }
  } catch (error) {
    console.error('Error:', error)
  }
  return valid
}
