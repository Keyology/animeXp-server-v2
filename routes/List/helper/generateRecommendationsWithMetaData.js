const recommendations = require('./generateRecommendations')
const animeMetaData = require('./getAnimeMetaData')

exports.generateRecommendationsWithMetaData = async function (listItems) {
  const data = await animeMetaData.getAnimeDataForList(
    await recommendations.generateRecommendations(listItems)
  )
  console.log('recommendations data:', data)
  return data
}
