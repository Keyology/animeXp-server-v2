
exports.home = async function (req, res) {
  const message = { 'server active': true }
  res.json(message)
}
