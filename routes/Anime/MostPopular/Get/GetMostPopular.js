const helper = require('./GetMostPopularHelper')

exports.getMostPopular = async function (req, res) {
  const { success, anime, message } = await helper.getMostPopularLogic()
  const statusCode = success ? 200 : 503
  return res.json({ success, animeList: anime, message }).status(statusCode)
}
