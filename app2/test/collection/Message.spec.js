require('../bootstrap.js');

let oFakeMongooseManager;
const oFakeSchema = {};
const oFakeMongooseModel = {};
describe('Message - Tests', () => {

  before(() => {
    //Mock dependencies
    oFakeMongooseManager = {
      Schema: sinon.stub().returns(oFakeSchema),
      model: sinon.stub().returns(oFakeMongooseModel)
    }
    injectjs.core.Import.setModule('tcc.src.core.MongooseManager', oFakeMongooseManager);
  });

  describe('Inspection', () => {
    it('Should be a Mongoose Model', (done) => {
      define([
        'original.tcc.src.collection.Message'
      ], Message => {
        chai.expect(Message).to.equal(oFakeMongooseModel);
        done();
      });
    });
    it('Should create a new Message Schema', () => {
      chai.expect(oFakeMongooseManager.Schema.calledWithNew()).to.equal(true);
      chai.expect(oFakeMongooseManager.Schema.callCount).to.equal(1);
      chai.expect(
        JSON.stringify(oFakeMongooseManager.Schema.args[0][0])
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
      chai.expect(oFakeMongooseManager.model.callCount).to.equal(1);
      chai.expect(oFakeMongooseManager.model.args[0][0]).to.equal('Message');
      chai.expect(oFakeMongooseManager.model.args[0][1]).to.equal(oFakeSchema);
    });

  });


});