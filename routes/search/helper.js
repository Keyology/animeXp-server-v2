const validator = require('validator')

exports.checkIfQueryIsAnimeId = async function (query) {
  const checkQueryContainLetters = validator.isNumeric(query)
  return checkQueryContainLetters ? true : false
}
