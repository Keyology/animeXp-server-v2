const Anime = require('../../../../models/Anime')
const validate = require('../../../../common/validator')

const hardCodedPopularAnime = [
  '35790',
  '30276',
  '21',
  '31964',
  '33486',
  '36456',
  '36474',
  '136',
  '34134',
  '5114'
]

exports.getMostPopularLogic = async function () {
  let success = false
  let errorMessage = null
  let anime = null

  try {
    anime = await Anime.find({
      animeId: { $in: hardCodedPopularAnime }
    })
    success = !(anime === null)
    if (!success) errorMessage = 'Unsuccessful. Error finding most popular anime'
  } catch (error) {
    console.error('Error:', error)
    errorMessage = 'Error'
  }

  return { success, anime, message: errorMessage }
}
