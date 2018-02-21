var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('index', function() {
  it('should be a html page with title HitCount', function(done) {
  chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.html;
      res.text.should.contains('<title>HitCount</title>'); // passes test
      done();
    });
  });
});
