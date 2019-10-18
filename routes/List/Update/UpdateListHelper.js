const AnimeList = require('../../../models/AnimeList')
const validate = require('../../../common/validator')
const auth = require('../../../common/auth')
const recommendations = require('../helper/generateRecommendations')

const updateAnimeListObject = async function (animeList, newAnimeItems) {
  animeList.animeList.push(...newAnimeItems)
  animeList.animeRecommendations = recommendations.generateRecommendations(animeList.animeList)
  return animeList
}

exports.updateListLogic = async function (data) {
  let success = false
  let errorMessage = 'Error signing'

  try {
    const { id, tokenExpired } = await auth.getIdFromJWTToken(data.token)

    if (id) {
      const animeList = await AnimeList.findOne(
        {
          _id: data.listId,
          userId: id
        }
      )
      await updateAnimeListObject(animeList, data.listItems).save()
      success = true
    } else if (tokenExpired) {
      errorMessage = 'Token expired'
    } else {
      errorMessage = 'Bad token'
    }
  } catch (error) {
    console.log('Error:', error)
  }

  return { success, errorMessage }
}

exports.dataValid = function (data) {
  let errorMessage = null
  const validToken = validate.validateToken(data.token)
  const validListId = validate.validateListId(data.listId)
  const validListItems = validate.validateListItems(data.listItems)
  if (!validToken || !validListItems || !validListId) {
    errorMessage = (!validToken
      ? 'Invalid Token' : (
        !validListId ? 'Invalid list id' : 'Invalid list or list items'
      )
    )
  }
  return errorMessage
}
