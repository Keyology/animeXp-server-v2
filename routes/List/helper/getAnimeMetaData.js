const Anime = require('../../../models/Anime')

exports.getAnimeDataForList = async function (animeList) {
  const originalIndexes = {}
  for (let i = 0; i < animeList.length; i += 1) {
    originalIndexes[animeList[i]] = i
  }
  const filterFields = { animeTitles: 1, animePicUrl: 1, animeSynopsis: 1, animeId: 1 }
  const getAnimeFromDb = (
    await Anime.find({ animeId: { $in: animeList } }, filterFields).lean()
  ).sort((animeA, animeB) => {
    return originalIndexes[animeA.animeId] - originalIndexes[animeB.animeId]
  })

  return getAnimeFromDb
}
