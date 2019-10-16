const validator = require('validator')

exports.checkIfQueryIsAnimeId = async function (query) {
  // check if query is a anime title or anime ID
  const checkQueryContainLetters = validator.isNumeric(query)
  return checkQueryContainLetters && query.length !== 24 ? true : false
}
