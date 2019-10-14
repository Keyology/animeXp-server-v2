const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnimeListSchema = new Schema({
  userId: String,
  animeListName: String,
  animeListDescription: String,
  animeList: [[String]],

  animeRecommendations: [],

  similarList: [{ listId: String, listScore: Number }]
})

module.exports = mongoose.model('AnimeList', AnimeListSchema)
