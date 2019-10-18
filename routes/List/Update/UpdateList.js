
const helper = require('./UpdateListHelper')

exports.updateList = async function (req, res) {
  const data = {
    token: req.headers.token,
    listId: req.body.listId,
    newItems: req.body.newItems
  }
  const invalidDataErrorMessage = helper.dataValid(data)
  if (invalidDataErrorMessage) return res.status(412).send({ message: invalidDataErrorMessage })

  const { success, errorMessage } = helper.updateListLogic(data)
  const statusCode = success ? 200 : 503
  return res.json({ success, message: errorMessage }).status(statusCode)
}
