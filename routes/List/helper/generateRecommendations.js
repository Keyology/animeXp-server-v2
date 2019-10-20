const AnimeRecommendations = require('../../../models/AnimeRecs')

/**
 * Each anime in the user's original list will have a list of recommendations associated with them,
 * some anime may have a empty list for their recommendations. This method gets the
 * indexes of the lists that are not empty.
 *
 * @param {List[AnimeRec]} recommendations - A list of AnimeRec objects
 *
 * @output {Set[Integer]} - An array filled with Integers.
 */
const getAllowedRecommendationLists = function (recommendations) {
  const nonEmptyAnimeListsIndexes = new Set()
  // Getting the max number of recommendations per anime
  for (let i = 0; i < recommendations.length; i++) {
    if (recommendations[i].animeRecommendations.length > 0) nonEmptyAnimeListsIndexes.add(i)
  }

  return nonEmptyAnimeListsIndexes
}

/**
 * Sum up the similarity score for each anime recommendation across each anime in the
 * user's anime list, then normalizes it
 *
 * @param {List[Integer]} nonEmptyAnimeListsIndexes
 * @param {List[AnimeRec]} recommendationsForEachAnime
 * @param {Set(String)} animeInUserListSet
 *
 * @output {Object} - Object where the keys are anime ids, and the values are floats.
 */
const averageScoreForEachRecommendation = function (
  nonEmptyAnimeListsIndexes,
  recommendationsForEachAnime,
  animeInUserListSet
) {
  const scoreForEachAnime = {}
  // This sums the similarity scores for each anime recommendation
  let animeListIndex
  for (animeListIndex of nonEmptyAnimeListsIndexes) {
    const recommendationsForAnime = recommendationsForEachAnime[animeListIndex].animeRecommendations
    let animeRecObject
    for (animeRecObject of recommendationsForAnime) {
      const animeRecId = animeRecObject.animeId
      const animeRecScore = animeRecObject.animeScore
      // Exclude anime that is already in the user's list
      if (!animeInUserListSet.has(animeRecId)) {
        scoreForEachAnime[animeRecId] = scoreForEachAnime[animeRecId]
          ? scoreForEachAnime[animeRecId] + animeRecScore
          : animeRecScore
      }
    }
  }

  // This averages the summed score for each anime recommendation
  Object.keys(scoreForEachAnime).map(
    function (animeRecId, index) {
      scoreForEachAnime[animeRecId] /= nonEmptyAnimeListsIndexes.size
    }
  )
  return scoreForEachAnime
}

const rankAnime = function (scoreForEachAnime) {
  return Object.keys(scoreForEachAnime).sort(function (a, b) {
    return scoreForEachAnime[b] - scoreForEachAnime[a]
  })
}

/**
 * This method takes in an anime list and list of recommendations,
 * then produces the top recommendations for that anime list
 *
 * @param {List[String]} animeList
 * @param {List[AnimeRec]} recommendationsForEachAnime
 *
 * @output {List[String]} A list of anime ids in a descending order based off postive score
 */
const getMostSimilarAnimeUsingAverageScore = function (animeList, recommendationsForEachAnime) {
  const nonEmptyAnimeListsIndexes = getAllowedRecommendationLists(recommendationsForEachAnime)
  const animeInUserListSet = new Set(animeList)
  const scoreForEachAnime = averageScoreForEachRecommendation(
    nonEmptyAnimeListsIndexes,
    recommendationsForEachAnime,
    animeInUserListSet
  )
  const rankedAnimeRecs = rankAnime(scoreForEachAnime)
  return rankedAnimeRecs
}

/**
 * Public method for generation anime recommendations for an anime list
 *
 * @param {List[Integer]} userAnimeList
 *
 * @output {List[String]} A list of anime ids in a descending order based off postive score, max length of list is 100
 */
exports.generateRecommendations = async function (userAnimeList) {
  // Maybe we need to combine Anime and AnimeRecommendation
  // so we don't need to do seperate calls for getting anime recs and anime recs with meta data
  const recommendations = await AnimeRecommendations.find({
    animeId: { $in: userAnimeList }
  })
  if (!recommendations || recommendations.length === 0) return []
  const s = getMostSimilarAnimeUsingAverageScore(userAnimeList, recommendations).slice(0, 100)
  console.log('Recommendations', s.slice(0, 5))
  return s
}
