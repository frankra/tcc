require('../bootstrap.js');


describe('HTTP - Tests', () => {
  describe('Inspection', () => {
    it('Should be an object', (done) => {
      define([
        'original.tcc.src.external.http'
      ], HTTP=>{
        chai.expect(typeof HTTP).to.equal('object');
        done();
      });
    });
    it('Should be a reference to the "http" module', (done) => {
      define([
        'original.tcc.src.external.http'
      ], HTTP=>{
        chai.expect(HTTP).to.equal(require('http'));
        done();
      });
    });
  });
});