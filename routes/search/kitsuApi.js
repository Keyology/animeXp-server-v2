const axios = require('axios')
const queryDb = require('./db-query')

// exports.getAnimeFromKitsuByTitle = async (query) => {
//   // call kitsu api to get anime that is not in our db
//   const url = `https://kitsu.io/api/edge/anime?filter[text]=${query}`
//   const callApi = await request(url, async (error, response, body) => {
//     if (error || response.statusCode >= 400) {
//       console.error('ERROR CALLING KITSU API BY TITLE:', error)
//       console.error('KITSU API RESPONSE STATUS CODE:', response.statusCode)
//       return null
//     }
//     const saveToDb = await queryDb.saveKitsuAnimeToDb(JSON.parse(body))
//     return saveToDb ? null : true
//   })
//   console.log('----CALL API----', callApi)
//   return callApi
// }

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
