const Anime = require('../../../../models/Anime')
const validate = require('../../../../common/validator')

exports.getAnimeLogic = async function (data) {
  let success = false
  let errorMessage = null
  let anime = null

  try {
    anime = await Anime.findOne({ animeId: data.animeId }).lean()
    success = !(anime === null)
    if (!success) errorMessage = 'Bad list id'
  } catch (error) {
    console.error('Error:', error)
    errorMessage = 'Error getting list'
  }

  return { success, anime, message: errorMessage }
}

exports.dataInvalid = function (data) {
  const validAnimeId = validate.validateAnimeId(data.animeId)
  const errorMessage = validAnimeId ? null : 'Invalid anime id'
  return errorMessage
}
