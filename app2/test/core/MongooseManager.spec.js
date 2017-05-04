require('../bootstrap.js');

let MongooseManager;
let oFakeMongoose;

describe('MongooseManager - Tests', () => {

  before(() => {
    //Mock dependencies
    oFakeMongoose = {
      connect: sinon.stub(),
      connection: {
        once: sinon.spy((sEventName, fnCallback)=>{ //Fake db connection succeeded
          fnCallback();
        })
      }
    }
    injectjs.core.Import.setModule('tcc.src.external.mongoose', oFakeMongoose);
  });

  describe('Inspection', () => {
    it('Should connect to the Database', (done) => {
      define([
        'original.tcc.src.core.MongooseManager'
      ], MongooseManager=>{
        chai.expect(oFakeMongoose.connect.callCount).to.equal(1);
        chai.expect(oFakeMongoose.connect.args[0][0]).to.equal('mongodb://localhost/tcc');
        done();
      });
    });
    it('Should define the Promise library as the Native Node Promises', (done) => {
      define([
        'original.tcc.src.core.MongooseManager'
      ], MongooseManager=>{
        chai.expect(oFakeMongoose.Promise).to.equal(global.Promise);
        done();
      });
      
    });
    it('Should be a pointer to the Mongoose dependency', (done) => {
       define([
        'original.tcc.src.core.MongooseManager'
      ], MongooseManager=>{
        chai.expect(MongooseManager).to.equal(oFakeMongoose);
        done();
      });
    });
    it('Should be resolved once the DB connection is estabilished', (done) => {
       define([
        'original.tcc.src.core.MongooseManager'
      ], MongooseManager=>{
        chai.expect(oFakeMongoose.connection.once.callCount).to.equal(1);
        chai.expect(oFakeMongoose.connection.once.args[0][0]).to.equal('open');
        chai.expect(typeof oFakeMongoose.connection.once.args[0][1]).to.equal('function');

        //Module resolution is already tested since we are using it to get the instance on these unit tests. See ln 13 of this same file
        done();
      });
    });
  });
  
});