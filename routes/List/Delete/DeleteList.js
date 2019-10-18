const helper = require('./deleteListHelper')

exports.deleteList = async function (req, res) {
  const data = {
    token: req.headers.token,
    listId: req.params.listId
  }
  const invalidDataErrorMessage = await helper.dataValid(data)
  if (invalidDataErrorMessage) return res.status(412).send({ message: invalidDataErrorMessage })

  const { success, message } = await helper.deleteListLogic(data)
  const statusCode = success ? 200 : 503
  return res.json({ success, message }).status(statusCode)
}
