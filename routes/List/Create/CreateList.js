
const helper = require('./createListHelper')

exports.createList = async function (req, res) {
  const data = {
    token: req.headers.token,
    listName: req.body.list_name,
    listDescription: req.body.list_description,
    listItems: req.body.list_items
  }
  const invalidDataErrorMessage = helper.dataValid(data)
  if (invalidDataErrorMessage) return res.status(412).send({ message: invalidDataErrorMessage })

  const { success, list, message } = await helper.createListLogic(data)
  const statusCode = success ? 200 : 503
  return res.json({ success, list, message }).status(statusCode)
}
