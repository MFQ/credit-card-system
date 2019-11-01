var request = require('supertest');
var app = require('./../app');

describe('GET /cards', function() {
  var creditCard = Math.random().toString(11).replace('0.', '');

  afterAll(done => {
    app.close(done)
    process.exit(1); 
  });

  it('get cards', function(done) {
    request(app)
      .get('/cards')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(){
        done();
      })
  });

  it('create cards', function(done) {
    request(app)
      .post('/cards')
      .send(`name=john&cardNumber=${creditCard}&limit=11&balance=12`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(){
        done();
      })
  });
});