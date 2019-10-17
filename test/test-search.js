const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('..//bin/www')
const should = chai.should()

chai.use(chaiHttp)

describe('Test search endpoint ', () => {
  describe('search for anime in database', () => {
    it('Should return json with status code 200', (done) => {
      const searchQuery = 'naruto'
      chai.request(server)
        .get(`/api/v0/search/${searchQuery}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.a('object')
          done()
        })
    }).timeout(4000)
  })

  describe('test search routes for anime thats not in db', () => {
      it('Should return json with status code 200', (done) => {
        const searchQuery = 'one piece'
        chai.request(server)
        .get(`/api/v0/search/${searchQuery}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.a('object')
          done()
        })
    }).timeout(4000)
  })
})

// test search route by sending invalid search query

// test sending another type like null to the endpoint
