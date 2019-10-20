const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseHidden = require('mongoose-hidden')()


const UserSchema = new Schema({

  createdAt: {
    type: Date,
    default: Date.now
  },

  phoneNumber: {
    type: String,
    unique: true,
    sparse: true
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
    unique: true,
    sparse: true
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

  animeRating: [[Number], [Number]]
})

UserSchema.set('toJSON', { virtuals: true })

UserSchema.plugin(mongooseHidden, {
  virtuals: {
    userEmail: 'hideJSON',
    createdAt: 'hideJSON',
    password: 'hideJSON',
    phoneNumber: 'hideJSON',
    lastActive: 'hideJSON',
    carrier: 'hideJSON'
  }
})

module.exports = mongoose.model('User', UserSchema)
