const AnimeList = require('../../../models/AnimeList')
const validate = require('../../../common/validator')
const auth = require('../../../common/auth')
const recommendations = require('../helper/generateRecommendations')

const updateAnimeListObject = async function (animeListMongoObject, newAnimeItems) {
  animeListMongoObject.animeList = Array.from(
    new Set(animeListMongoObject.animeList.concat(newAnimeItems))
  )
  animeListMongoObject.animeRecommendations = await recommendations.generateRecommendations(
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
    console.log('Error:', error)
    errorMessage = 'Error signing'
  }

  return { success, message: errorMessage }
}

exports.dataValid = function (data) {
  let errorMessage = null
  const validToken = validate.hasToken(data.token)
  const validListId = validate.validateListId(data.listId)
  const validListItems = validate.validateListItems(data.newItems)
  if (!validToken || !validListItems || !validListId) {
    errorMessage = (!validToken
      ? 'Invalid Token' : (
        !validListId ? 'Invalid list id' : 'Invalid list or list items'
      )
    )
  }
  return errorMessage
}
