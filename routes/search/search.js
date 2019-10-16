const checkQueryTypeString = require('./helper')
const searchJob = require('..//..//jobs/searchAnimeInDb')

exports.searchDbForAnime = async function (req, res) {
  console.log('---QUERY----', req.params.query)

  const result = await searchJob.searchAnimeByName(req.params.query)

  console.log('---RESULT----', result)

//   return checkQueryTypeString.checkIfQueryIsAnimeId(req.params.query) ? console.log('---HIT---') : console.log("---NOT HIT------")


    // validate query is string 
    //check if string contains numbers of a certain length 
    //create a helper function for search that searches the db for the anime
    // if the db returs null call another helper function that scrapes data from kitsu

    // and parses / process data

// save data to db and return the results




// validate query 
// check if string contains numbers and is a certain length  to determine it's an id



}