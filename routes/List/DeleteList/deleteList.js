const AnimeList = require('../../../models/animeList')

exports.deleteList = (req, res) => {
  // find list by ID and remove it
  const listId = req.params.id
  AnimeList.findByIdAndDelete({ _id: listId }).then((result) => {
    return res.status(200).send({ message: 'List Removed' })
  }).catch((error) => {
    console.error('ERROR DELETING LIST:', error)
    return res.status(422).send({ message: 'Request could not be completed' })
  })
}
