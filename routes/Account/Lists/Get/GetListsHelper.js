const AnimeList = require('../../../../models/animeList')
const validate = require('../../../../common/validator')
const auth = require('../../../../common/auth')

exports.getListsLogic = async function (data) {
  let success = false
  let lists = null
  let errorMessage = null

  try {
    const { id, tokenExpired } = await auth.getIdFromJWTToken(data.token)

    if (id) {
      const fieldsToHide = { userId: 0 }
      lists = await AnimeList.find({ userId: id }, fieldsToHide).lean()
      success = true
    } else if (tokenExpired) {
      errorMessage = 'Token expired'
    } else {
      errorMessage = 'Bad token'
    }
  } catch (error) {
    console.error('Error:', error)
    errorMessage = 'Error getting list'
  }

  return { success, lists, message: errorMessage }
}

exports.dataValid = function (data) {
  const validListId = validate.validateListId(data.listId)
  const errorMessage = validListId ? null : 'Invalid list id'
  return errorMessage
}
