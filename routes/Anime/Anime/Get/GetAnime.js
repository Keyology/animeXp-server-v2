const helper = require('./GetAnimeHelper')

exports.getAnime = async function (req, res) {
  const data = {
    animeId: req.params.animeId
  }
  const invalidDataErrorMessage = await helper.dataValid(data)
  if (invalidDataErrorMessage) return res.status(412).send({ message: invalidDataErrorMessage })

  const { success, anime, message } = await helper.getAnimeLogic(data)
  const statusCode = success ? 200 : 503
  return res.json({ success, anime, message }).status(statusCode)
}
