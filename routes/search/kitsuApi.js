const request = require('request')

exports.getAnimeFromKitsuByTitle = async (query) => {
  // call kitsu api to get anime that is not in our db
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${query}`
  request(url, (error, response, body) => {
    if (error || response.statusCode >= 400) {
      console.error('ERROR CALLING KITSU API BY TITLE:', error)
      console.error('KITSU API RESPONSE STATUS CODE:', response.statusCode)
      return null
    }
    return JSON.parse(body)
  })
}
