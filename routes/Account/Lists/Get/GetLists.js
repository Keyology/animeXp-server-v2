const helper = require('./getListsHelper')

exports.getLists = async function (req, res) {
  const data = {
    token: req.headers.token
  }
  const { success, lists, message } = await helper.getListsLogic(data)
  const statusCode = success ? 200 : 503
  return res.json({ success, lists, message }).status(statusCode)
}
