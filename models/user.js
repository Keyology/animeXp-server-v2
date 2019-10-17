const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseHidden = require('mongoose-hidden')()

const UserSchema = new Schema({
  userId: {
    type: mongoose.type.ObjectId
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  phoneNumber: {
    type: String,
    default: null,
    unique: true
  },

  carrier: {
    type: String,
    default: null
  },

  userName: {
    trim: true,
    type: String
  },
  isSignedUp: {
    type: Boolean
  },
  userEmail: {
    type: String,
    default: null,
    unique: true
  },

  password: {
    type: String,
    default: null
  },
  otherUserName: [{ animeWebsiteLink: String, otherUsername: String }],

  lastActive: {
    type: Date,
    default: Date.now
  },

  userAnimeList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AnimeList'
    }
  ],
  animeRating: [[Number], [Number]]
})

UserSchema.index({
  userEmail: 1,
  phoneNumber: 1,
  userId: 1

}, {
  unique: true,
  sparse: true
})

UserSchema.set('toJSON', { virtuals: true })

UserSchema.plugin(mongooseHidden, {
  virtuals: {
    createdAt: 'hideJSON',
    password: 'hideJSON',
    phoneNumber: 'hideJSON',
    lastActive: 'hideJSON',
    carrier: 'hideJSON'
  }
})

module.exports = mongoose.model('User', UserSchema)
