const helper = require('./helper')
const kitsuApi = require('./kitsuApi')
const queryDb = require('./db-query')

exports.searchForAnime = async function (req, res) {
  const searchQuery = req.params.query
  try {
    const queryIsId = await helper.checkIfQueryIsAnimeId(searchQuery)
    if (!queryIsId) {
      const searchResuts = await queryDb.searchAnimeByName(searchQuery)
      if (searchResuts !== null && Object.entries(searchResuts).length !== 0) return res.json(searchResuts).status(200)
      const kitsuResp = await kitsuApi.getAnimeFromKitsuByTitle(searchQuery)
      if (kitsuResp === null) return res.status(400).send({ message: 'Invalid Input' })
      const checkForUpdateSearchResults = await queryDb.searchAnimeByName(searchQuery)
      return res.status(200).json(checkForUpdateSearchResults)
    }
    // search for anime by id if not null return results otherwise call kitsu to get anime  
   // if anime id is 24 charcters don't pass to kitsu api call return could not find anime 
   // otherwise save kitsu response to db and return 
  } catch (error) {
    res.status(412).send({ message: 'Invalid input' })
    console.error(`COULD NOT FIND QUERY: ${searchQuery}`)
    console.error('SEARCH ERROR:', error)
  }
}
