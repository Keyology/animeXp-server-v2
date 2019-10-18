
const helper = require('./CreateListHelper')

exports.createList = async function (req, res) {
  const data = {
    token: req.headers.token,
    listName: req.body.listName,
    listDescription: req.body.listDescription,
    listItems: req.body.listItems
  }
  const invalidDataErrorMessage = helper.dataValid(data)
  if (invalidDataErrorMessage) return res.status(412).send({ message: invalidDataErrorMessage })

  const { success, errorMessage } = helper.createListLogic(data)
  const statusCode = success ? 200 : 503
  return res.json({ success, message: errorMessage }).status(statusCode)
}
