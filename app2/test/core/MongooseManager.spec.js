return
require('../bootstrap.js');

const FILE_PATH = '../../src/core/MongooseManager.js';
let MongooseManager;
let oFakeMongoose;

describe('MongooseManager - Tests', () => {

  beforeEach(() => {
    //Mock dependencies
    oFakeMongoose = {
      connect: sinon.stub()
    }
    mock('mongoose', oFakeMongoose);

    MongooseManager = mock.reRequire(FILE_PATH);
  });

  after(()=>{
    mock.stop('mongoose');
  });

  describe('Inspection', () => {
    it('Should connect to the Database', () => {
      chai.expect(oFakeMongoose.connect.callCount).to.equal(1);
      chai.expect(oFakeMongoose.connect.args[0][0]).to.equal('mongodb://localhost/tcc');
    });
    it('Should define the Promise library as the Native Node Promises', () => {
      chai.expect(oFakeMongoose.Promise).to.equal(global.Promise);
    });
    it('Should be a pointer to the Mongoose dependency', () => {
      chai.expect(MongooseManager).to.equal(oFakeMongoose);
    });
  });
  
});