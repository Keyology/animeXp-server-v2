const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnimeRecsSchema = new Schema({
  animeId: {
    type: String,
    required: true,
    unique: true
  },

  animeRecommendations: [{ animeId: String, animeScore: Number }]
})

module.exports = mongoose.model('AnimeRecommendations', AnimeRecsSchema)
