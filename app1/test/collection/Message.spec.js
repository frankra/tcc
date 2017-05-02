require('../bootstrap.js');

const FILE_PATH = '../../src/collection/Message.js';
let Message;
let oMockMongooseManager;
const oFakeMongooseModel = {};
const oFakeSchema = {};

describe('Message - Tests', () => {

  beforeEach(() => {
    oMockApp = {
      get: sinon.spy()
    }
    //Mock dependencies
    oMockMongooseManager = {
      Schema: sinon.stub().returns(oFakeSchema),
      model: sinon.stub().returns(oFakeMongooseModel)
    }
    mock('../../src/core/MongooseManager.js', oMockMongooseManager);

    Message = mock.reRequire(FILE_PATH);
  });

  after(()=>{
    mock.stop('../../src/core/MongooseManager.js');
  });

  describe('Inspection', () => {
    it('Should be a Mongoose Model', () => {
      chai.expect(Message).to.equal(oFakeMongooseModel);
    });
    it('Should create a new Message Schema', () => {
      chai.expect(oMockMongooseManager.Schema.calledWithNew()).to.equal(true);
      chai.expect(oMockMongooseManager.Schema.callCount).to.equal(1);
      chai.expect(
        JSON.stringify(oMockMongooseManager.Schema.args[0][0])
      ).to.equal(
        JSON.stringify({//Copy and paste from the module itself...
          user: String,
          message: String,
          date: {
            type: Date,
            default: Date.now
          }
        })
      );
    });
    it('Should model the Message collection', () => {
      chai.expect(oMockMongooseManager.model.callCount).to.equal(1);
      chai.expect(oMockMongooseManager.model.args[0][0]).to.equal('Message');
      chai.expect(oMockMongooseManager.model.args[0][1]).to.equal(oFakeSchema);
    });

  });


});