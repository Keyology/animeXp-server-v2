const AnimeList = require('../../../models/AnimeList')
const validate = require('../../../common/validator')
const auth = require('../../../common/auth')
const recommendations = require('../helper/generateRecommendationsWithMetaData')

const updateAnimeListObject = async function (animeListMongoObject, newAnimeItems) {
  animeListMongoObject.animeList = Array.from(
    new Set(animeListMongoObject.animeList.concat(newAnimeItems))
  )
  animeListMongoObject.animeRecommendations = await recommendations.generateRecommendationsWithMetaData(
    animeListMongoObject.animeList
  )
}

exports.updateListLogic = async function (data) {
  let success = false
  let errorMessage = null

  try {
    const { id, tokenExpired } = await auth.getIdFromJWTToken(data.token)

    if (id) {
      const animeList = await AnimeList.findOne(
        {
          _id: data.listId,
          userId: id
        }
      )
      await updateAnimeListObject(animeList, data.newItems)
      animeList.save()
      success = true
    } else if (tokenExpired) {
      errorMessage = 'Token expired'
    } else {
      errorMessage = 'Bad token'
    }
  } catch (error) {
    console.error('Error:', error)
    errorMessage = 'Error updating list'
  }

  return { success, message: errorMessage }
}

exports.dataInvalid = function (data) {
  let errorMessage = null
  const validListId = validate.validateListId(data.listId)
  const validListItems = validate.validateListItems(data.newItems)
  if (!validListItems || !validListId) {
    errorMessage = !validListId ? 'Invalid list id' : 'Invalid list or list items'
  }
  return errorMessage
}
