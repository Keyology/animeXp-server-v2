const helper = require('./getListHelper')

exports.getList = async function (req, res) {
  const data = {
    listId: req.params.listId
  }
  const invalidDataErrorMessage = await helper.dataValid(data)
  if (invalidDataErrorMessage) return res.status(412).send({ message: invalidDataErrorMessage })

  const { success, list, message } = await helper.getListLogic(data)
  const statusCode = success ? 200 : 503
  return res.json({ success, list, message }).status(statusCode)
}
