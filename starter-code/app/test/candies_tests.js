const should    = require('chai').should(),
      expect    = require('chai').expect,
      supertest = require('supertest'),
      api       = supertest('http://localhost:3000')

describe('GET /candies', function(){
  // tests go here
  it('should return a 200 response', function(done){
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .expect(200, done)
  })

  it('should return an array', function(done){
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end(function(error, response){
        expect(response.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects that have a field called "name" ', function(done){
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(res.body[0]).to.have.property('name')
        done()
      })
  })
})

describe('POST /candies', function(){
  before(function(done){
    api
      .post('/candies')
      .set('Accept', 'application/json')
      .send({
        id: 5,
        name: 'Lollipop',
        color: 'Red'
      }).end(done)
  })

  after(function(done){
    api
      .delete('/candies/5')
      .set('Accept', 'application/json')
      .end(function(err, res){
        expect(res.body.message).to.equal('deleted')
        done()
      })
  })

  it('should add a candy object to the collection of candies and return it', function(done){
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end(function(err, res){
        expect(res.body.length).to.equal(5);
        done()
      })
  })
})
