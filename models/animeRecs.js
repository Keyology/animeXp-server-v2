const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnimeRecsSchema = new Schema({
  animeId: String,

  animeRecommendations: [{ animeId: String, animeScore: Number }]
})

module.exports = mongoose.model('AnimeRecsSchema', AnimeRecsSchema)
