const Anime = require('..//..//..//models/anime')
const cleanData = require('..//..//..//routes/search/cleanResp')
const agendaFunctions = require('..//..//agenda')
const agenda = agendaFunctions.agenda

agenda.define('save anime from kitsu to db', { priority: 'high', concurrency: 2 }, async (job, done) => {
  const data = job.attrs.data
  const animes = []
  for (let i = 0; i < data.data.length; i++) {
    animes.push(await cleanData.parseAnimeData(data.data[i]))
    await new Anime(animes[i]).save()
  }
  done()
})
