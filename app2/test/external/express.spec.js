require('../bootstrap.js');


describe('Express - Tests', () => {
  describe('Inspection', () => {
    it('Should be a function', (done) => {
      define([
        'original.tcc.src.external.express'
      ], Express=>{
        chai.expect(typeof Express).to.equal('function');
        done();
      });
    });
    it('Should be a reference to the "express" module', (done) => {
      define([
        'original.tcc.src.external.express'
      ], Express=>{
        chai.expect(Express).to.equal(require('express'));
        done();
      });
    });
  });
});