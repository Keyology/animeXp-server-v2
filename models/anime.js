const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnimeSchema = new Schema({
  animeId: {
    type: String,
    required: true
  },

  animeStatus: String,

  animeFormat: String,

  animeSlug: String,

  animeTitles: [String],

  animeSynopsis: { type: String },

  animeCoverImg: String,
  animePicUrl: String,

  animeCoverImgs: {
    kitsu: String,
    anilist: String
  },

  animePicImgs: {
    kitsu: String,
    anilist: String
  },

  animeStartDate: String,

  animeEndDate: String,

  animeAgeRatingGuide: String,

  animeTrailers: {
    kitsu: {
      site: String,
      id: String
    },
    anilist: {
      site: String,
      id: String
    }
  },

  animeGenres: [String],

  animeTags: [String],

  animeModNotes: String,

  animeNumEpisodes: Number,

  animeExternalLinks: [{ url: String }],

  animeStreamingEpisodes: [
    {
      title: String,
      thumbnailUrl: String,
      episodeUrl: String,
      site: String
    }
  ],

  animeNextAiringEpisode: {
    airingAt: Number,
    timeUntilAiring: Number,
    episode: Number
  },

  animeReviews: [{ body: String }],

  animeNSFW: Boolean,

  animeIds: {
    malId: String,
    kitsuId: String,
    anilistId: String
  },
  created_At: {
    type: Date,
    default: Date.now
  }
})

AnimeSchema.index({ animeTitles: 1, animeId: 1, type: -1 }, { unique: true })

module.exports = mongoose.model('Anime', AnimeSchema)
