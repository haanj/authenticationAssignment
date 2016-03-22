'use strict';
// NOTE: Server needs to be running before running the test
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;

describe('/login resource routing tests', function() {
  this.timeout(0); // due to latency with mongodb
  it('should return "Hello World" after get request', (done) => {
    request('localhost:3000')
      .get('/login')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('"Hello world"');
        done();
      });
  });

  it('should return status: "failure" after bad post request', (done) => {
    request('localhost:3000')
      .post('/login')
      .send('blah')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql('failure');
        done();
      });
  });

  it('should return status: "failure" if incorrect password', (done) => {
    request('localhost:3000')
      .post('/login')
      .auth('testname', 'notapass')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql('failure');
        done();
      });
  });

  it('should return status: "failure" if user doesn\'t exist', (done) => {
    request('localhost:3000')
      .post('/login')
      .auth('notarealuser', 'notapass')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql('failure');
        done();
      });
  });

  it('should return a token if user and pass are correct', (done) => {
    request('localhost:3000')
      .post('/login')
      .auth('testname', 'password123')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql('success');
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
