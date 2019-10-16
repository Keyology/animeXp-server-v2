const Anime = require('..//..//models/anime')
const cleanData = require('./cleanResp')

exports.searchAnimeByName = async (query) => {
  // search for anime by title in db
  try {
    const filterFields = { animeId: 1, animeTitles: 1, animePicUrl: 1, animeSynopsis: 1, _id: 0 }
    return await Anime.find({ animeTitles: { $elemMatch: { $regex: new RegExp(query, 'i') } } }, filterFields).lean().limit(15)
  } catch (error) {
    console.error('ERROR SEARCHING ANIME BY NAME:', error)
  }
}

exports.saveKitsuAnimeToDb = async (data) => {
  try {
    const animes = []
    for (let i = 0; i < data.data.length; i++) {
      animes.push(await cleanData.parseAnimeData(data.data[i]))
      await new Anime(animes[i]).save()
    }
    return true
  } catch (error) {
    console.error('ERROR SAVING KITSU ANIME TO DB:', error)
    return false
  }
}
