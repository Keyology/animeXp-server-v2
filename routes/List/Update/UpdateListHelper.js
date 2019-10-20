const AnimeList = require('../../../models/AnimeList')
const validate = require('../../../common/validator')
const auth = require('../../../common/auth')
const animeMetaData = require('../helper/getAnimeMetaData')
const recommendations = require('../helper/generateRecommendationsWithMetaData')

const updateAnimeListObject = async function (animeListMongoObject, newAnimeItems) {
  const animeAddedByUser = Array.from(new Set(animeListMongoObject.animeList.concat(newAnimeItems)))
  const correctedAnimeItems = []
  let animeItem
  for (animeItem of animeAddedByUser) {
    if (animeItem.animeId) {
      correctedAnimeItems.push(animeItem.animeId)
    } else {
      correctedAnimeItems.push(animeItem)
    }
  }

  animeListMongoObject.animeRecommendations = await recommendations.generateRecommendationsWithMetaData(
    correctedAnimeItems
  )
  animeListMongoObject.animeList = await animeMetaData.getAnimeDataForList(
    correctedAnimeItems
  )
}

exports.updateListLogic = async function (data) {
  let success = false
  let errorMessage = null

  try {
    const { id, tokenExpired } = await auth.getIdFromJWTToken(data.token)

    if (id) {
      const animeLists = await AnimeList.find(
        {
          _id: data.listIds,
          userId: id
        }
      )
      let animeList
      for (animeList of animeLists) {
        await updateAnimeListObject(animeList, data.newItems)
        animeList.save()
      }
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
  const validListIds = validate.validateListIds(data.listIds)
  const validListItems = validate.validateListItems(data.newItems)
  if (!validListItems || !validListIds) {
    errorMessage = !validListIds ? 'Invalid list ids' : 'Invalid list or list items'
  }
  return errorMessage
}
