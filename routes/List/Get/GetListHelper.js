const AnimeList = require('../../../models/AnimeList')
const validate = require('../../../common/validator')

exports.getListLogic = async function (data) {
  let success = false
  let errorMessage = null

  try {
    await AnimeList.findById({ _id: data.listId })
    success = true
  } catch (error) {
    console.log('Error:', error)
    errorMessage = 'Error getting list'
  }

  return { success, message: errorMessage }
}

exports.dataValid = function (data) {
  const validListId = validate.validateListId(data.listId)
  const errorMessage = validListId ? null : 'Invalid list id'
  return errorMessage
}
