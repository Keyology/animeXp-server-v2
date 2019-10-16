const Agenda = require('agenda')
require('dotenv').config({ path: '.env' })

const agenda = new Agenda(
 { db: { 
      address: process.env.db_url,
      collection: 'agendaJobs',
      options: { useNewUrlParser: true }
    }
  })
module.exports = { Agenda, agenda }
