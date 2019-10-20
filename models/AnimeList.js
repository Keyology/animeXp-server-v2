const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseHidden = require('mongoose-hidden')()
// file name 
const AnimeListSchema = new Schema({
  userId: String,
  animeListName: String,
  animeListDescription: String,
  animeList: [String],

  animeRecommendations: [],

  similarList: [{ listId: String, listScore: Number }]
})

AnimeListSchema.set('toJSON', { virtuals: true })
AnimeListSchema.plugin(
  mongooseHidden,
  {
    virtuals: {
      userId: 'hideJSON',
      similarList: 'hideJSON'
    }
  }
)
module.exports = mongoose.model('AnimeList', AnimeListSchema)
