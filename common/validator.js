const check = require("check-types");

exports.validateEmail = async function(email) {
  let valid = false;
  try {
    if (check.string(email) && validator.isEmail(email)) {
      valid = true;
    }
  } catch (error) {
    console.error(error);
  }
  return valid;
};

exports.validatePassword = async function(password) {
  let valid = false;
  try {
    if (check.string(password) && password.length >= 10) {
      valid = true;
    }
  } catch (error) {
    console.error(error);
  }
  return valid;
};

exports.validateUserName = async function(userName) {
  let valid = false;
  try {
    if (check.string(userName) ? true : false) {
      valid = true;
    }
  } catch (error) {
    console.error(error);
  }
  return valid;
};
