const AnimeList = require('../../../models/AnimeList')
const validate = require('../../../common/validator')
const auth = require('../../../common/auth')

exports.deleteListLogic = async function (data) {
  let success = false
  let errorMessage = null

  try {
    const { id, tokenExpired } = await auth.getIdFromJWTToken(data.token)

    if (id) {
      await AnimeList.findOneAndDelete({ _id: data.listId, userId: id })
      success = true
    } else if (tokenExpired) {
      errorMessage = 'Token expired'
    } else {
      errorMessage = 'Bad token'
    }
  } catch (error) {
    console.error('Error:', error)
    errorMessage = 'Error deleting list'
  }

  return { success, message: errorMessage }
}

exports.dataValid = function (data) {
  const validListId = validate.validateListId(data.listId)
  const errorMessage = validListId ? null : 'Invalid list id'
  return errorMessage
}
