const axios = require('axios')
const queryDb = require('./db-query')

exports.getAnimeFromKitsuByTitle = async (query) => {
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${query}`
  const response = await axios.get(url)
  if (response.status >= 400) {
    console.error('CALLING KITSU SEARCH TEXT API STATUS:', response.status)
    return null
  }
  const saveToDb = await queryDb.saveKitsuAnimeToDb(response.data)
  return saveToDb ? true : null
}
