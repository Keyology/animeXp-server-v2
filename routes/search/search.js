const helper = require('./helper')
const kitsuApi = require('./kitsuApi')
const queryDb = require('./db-query')

exports.searchForAnime = async function (req, res) {
  const searchQuery = req.params.query
  try {
    const queryIsId = await helper.checkIfQueryIsAnimeId(searchQuery)
    if (!queryIsId) {
      const searchResuts = await queryDb.searchAnimeByName(searchQuery)
      if (searchResuts !== null) return res.json(searchResuts).status(200)
      const kitsuResp = kitsuApi.getAnimeFromKitsuByTitle(searchQuery)
      if (kitsuResp === null) return res.status(400).send({ message: 'Invalid Input' })
      const savekitsuRespToDb = await queryDb.savekitsuRespToDb(kitsuResp)
      return savekitsuRespToDb === true ? res.json(searchResuts).status(200) : res.status(503).send({ message: 'query does not exist' })
    }
    // if query is an id create helper function for searching db and return result
  } catch (error) {
    res.status(412).send({ message: 'Invalid input' })
    console.error(`COULD NOT FIND QUERY: ${searchQuery}`)
    console.error('SEARCH ERROR:', error)
  }
}
