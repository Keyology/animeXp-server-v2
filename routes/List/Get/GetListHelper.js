const AnimeList = require('../../../models/AnimeList')
const validate = require('../../../common/validator')

exports.getListLogic = async function (data) {
  let success = false
  let errorMessage = null
  let list = null

  try {
    list = await AnimeList.findById({ _id: data.listId })
    success = !(list === null)
    if (!success) errorMessage = 'Bad list id'
  } catch (error) {
    console.log('Error:', error)
    errorMessage = 'Error getting list'
  }

  return { success, list, message: errorMessage }
}

exports.dataValid = function (data) {
  const validListId = validate.validateListId(data.listId)
  const errorMessage = validListId ? null : 'Invalid list id'
  return errorMessage
}
