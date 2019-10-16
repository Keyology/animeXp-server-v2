const Anime = require('..//models/anime')
const agendaFunctions = require('..//jobs/agenda')
const agenda = agendaFunctions.agenda

// exports.searchAnimeNameJob = async (data) => {
//   let anime = null
//   agenda.define('Search db for anime by name', { priority: 'high', concurrency: 1 }, async job => {
//     const query = job.attrs.data
//     anime = await Anime.findOne({ animeTitles: { $regex: new RegExp(query, 'i') } }).lean()
//   })
//   agenda.now('Search db for anime by name', { data: data }) && agenda.start('Search db for anime by name', { data: data })
//   console.log('---ANIME---', anime)
//   return anime
// }

// exports.runSearchJob = (data) => {
//   return agenda.now('Search db for anime by name', { data: data }) && agenda.start('Search db for anime by name', { data: data })
// }

exports.searchAnimeByName = async (query) => {
  Anime.createIndexes({ animeTitles: 1 })
  const anime = Anime.find({ animeTitles: { $regex: new RegExp(query, 'i') } }).lean().limit(15).explain()
  return anime
}
