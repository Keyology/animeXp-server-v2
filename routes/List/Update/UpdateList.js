
const helper = require('./UpdateListHelper')

exports.updateList = async function (req, res) {
  const data = {
    token: req.headers.token,
    listIds: req.body.list_ids,
    newItems: req.body.new_items
  }
  const invalidDataErrorMessage = await helper.dataInvalid(data)
  if (invalidDataErrorMessage) return res.status(412).send({ message: invalidDataErrorMessage })

  const { success, message } = await helper.updateListLogic(data)
  const statusCode = success ? 200 : 503
  return res.json({ success, message }).status(statusCode)
}
