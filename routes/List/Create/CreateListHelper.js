const AnimeList = require('../../../models/AnimeList')
const validate = require('../../../common/validator')
const auth = require('../../../common/auth')
const recommendations = require('../helper/generateRecommendationsWithMetaData')

const generateAnimeListObject = async function (userId, data) {
  const animeList = await new AnimeList({
    userId,
    animeListName: data.listName,
    animeListDescription: data.listDescription,
    animeList: Array.from(
      new Set(data.listItems)
    ),
    animeRecommendations: await recommendations.generateRecommendationsWithMetaData(data.listItems)
  })
  return animeList
}

exports.generateAnimeListObject = generateAnimeListObject

exports.createListLogic = async function (data) {
  let success = false
  let errorMessage = null
  let animeList = null

  try {
    const { id, tokenExpired } = await auth.getIdFromJWTToken(data.token)

    if (id) {
      animeList = await generateAnimeListObject(id, data)
      await animeList.save()
      success = true
    } else if (tokenExpired) {
      errorMessage = 'Token expired'
    } else {
      errorMessage = 'Bad token'
    }
  } catch (error) {
    console.error('Error:', error)
    errorMessage = 'Error creating list'
  }

  return { success, list: animeList, message: errorMessage }
}

exports.dataInvalid = function (data) {
  let errorMessage = null
  const validListName = validate.validateListName(data.listName)
  const validListDescription = validate.validateListDescription(data.listDescription, true)
  const validListItems = validate.validateListItems(data.listItems, true)
  if (!validListName || !validListDescription || !validListItems) {
    errorMessage = (
      !validListItems ? 'Invalid list or list items' : (
        !validListName ? 'Invalid list name' : 'Invalid list description'
      )
    )
  }
  return errorMessage
}
