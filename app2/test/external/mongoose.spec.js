require('../bootstrap.js');


describe('Mongoose - Tests', () => {
  describe('Inspection', () => {
    it('Should be an object', (done) => {
      define([
        'original.tcc.src.external.mongoose'
      ], Mongoose=>{
        chai.expect(typeof Mongoose).to.equal('object');
        done();
      });
    });
    it('Should be a reference to the "mongoose" module', (done) => {
      define([
        'original.tcc.src.external.mongoose'
      ], Mongoose=>{
        chai.expect(Mongoose).to.equal(require('mongoose'));
        done();
      });
    });
  });
});