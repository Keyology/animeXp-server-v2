const AnimeRecommendations = require('../../../models/animeRecs')

// Each anime in the users original list will have a list associated with them
// some anime may have a empty list for their recommendations. This method gets the
// indexes of the lists that are not empty, as well as get the max number recommendations for
// any of the list of recommendations.
const getAllowedRecommendationListsAndMaxNumberOfRecommendations = function (recommendations) {
  const nonEmptyAnimeListsIndexes = Set()
  let maxLengthOfRecommendationsPerAnime = recommendations[0].animeRecommendations.length
  // Getting the max number of recommendations per anime
  for (let i = 0; i < recommendations.length; i++) {
    if (recommendations[i].animeRecommendations.length > maxLengthOfRecommendationsPerAnime) {
      maxLengthOfRecommendationsPerAnime = recommendations[i].animeRecommendations.length
    }
    if (recommendations[i].animeRecommendations.length > 0) nonEmptyAnimeListsIndexes.add(i)
  }

  return { maxLengthOfRecommendationsPerAnime, nonEmptyAnimeListsIndexes }
}

// Sum up the similarity score for each anime recommendation across each anime in the
// user's anime list, then normalizes it
const averageScoreForEachRecommendation = function (
  maxLengthOfRecommendationsPerAnime,
  nonEmptyAnimeListsIndexes,
  recommendationsForEachAnime,
  animeInUserListSet
) {
  const scoreForEachAnime = {}
  // This sums the similarity scores for each anime recommendation
  let animeListIndex
  for (animeListIndex in nonEmptyAnimeListsIndexes) {
    const recommendationsForAnime = recommendationsForEachAnime[animeListIndex].animeRecommendations
    Object.keys(recommendationsForAnime).map(
      function (animeRecId, index) {
        // Exclude anime that is already in the user's list
        if (!animeInUserListSet.has(animeRecId)) {
          scoreForEachAnime[animeRecId] = scoreForEachAnime[animeRecId]
            ? scoreForEachAnime[animeRecId] + recommendationsForAnime[animeRecId]
            : recommendationsForAnime[animeRecId]
        }
      }
    )
  }
  // This averages the summed score for each anime recommendation
  Object.keys(scoreForEachAnime).map(
    function (animeRecId, index) {
      scoreForEachAnime[animeRecId] /= nonEmptyAnimeListsIndexes.length
    }
  )
  return scoreForEachAnime
}

const rankAnime = function (scoreForEachAnime) {
  return Object.keys(scoreForEachAnime).sort(function (a, b) {
    return scoreForEachAnime[b] - scoreForEachAnime[a]
  })
}

// This method takes in an anime list and list of recommendations,
// then produces the top recommendations for that anime list
const getMostPopularAnimeUsingAverageScore = function (animeList, recommendationsForEachAnime) {
  const {
    maxLengthOfRecommendationsPerAnime,
    nonEmptyAnimeListsIndexes
  } = getAllowedRecommendationListsAndMaxNumberOfRecommendations(recommendationsForEachAnime)
  const animeInUserListSet = new Set(animeList)
  const scoreForEachAnime = averageScoreForEachRecommendation(
    maxLengthOfRecommendationsPerAnime,
    nonEmptyAnimeListsIndexes,
    recommendationsForEachAnime,
    animeInUserListSet
  )

  return rankAnime(scoreForEachAnime)
}

// Public method for generation anime recommendations for an anime list
exports.generateRecommendations = async function (userAnimeList) {
  const recommendations = await AnimeRecommendations.find({
    animeId: { $in: userAnimeList }
  })
  if (recommendations.length === 0) return []
  return getMostPopularAnimeUsingAverageScore(userAnimeList, recommendations)
}
