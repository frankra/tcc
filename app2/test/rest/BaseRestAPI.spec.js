return 
require('../bootstrap.js');

const FILE_PATH = "../../src/rest/BaseRestAPI";
const BaseRestAPI = require(FILE_PATH);

describe("BaseRestAPI - Tests", () => {
  describe("Inspection", () => {

    it("Should be a constructor", () => {
      let oObject = new BaseRestAPI();

      chai.expect(oObject.constructor).to.equal(BaseRestAPI);
    });
  });

  describe("API", () => {
    describe("getAll", () => {
      let oTestInstance;
      let oMockCollection;
      let aMockResponse = [];

      let oMockRes;
      let oMockReq = {};

      beforeEach(() => {
        oMockCollection = {
          find: sinon.stub().returns(Promise.resolve(aMockResponse))
        };

        oTestInstance = new BaseRestAPI(oMockCollection);

        oMockRes = {
          status: sinon.spy(() => {
            return oMockRes
          }),
          send: sinon.spy(() => { })
        };
      });

      it("Should retrieve all entities from the managed Collection", (done) => {
        let oPromise = oTestInstance.getAll(oMockReq, oMockRes);

        oPromise.then(() => {
          chai.expect(oMockCollection.find.callCount).to.equal(1);//called once
          chai.expect(oMockCollection.find.args[0][0]).to.equal(undefined);//with no args

          chai.expect(oMockRes.status.callCount).to.equal(1); //called once
          chai.expect(oMockRes.status.args[0][0]).to.equal(200); //called with 200

          chai.expect(oMockRes.send.callCount).to.equal(1);
          chai.expect(oMockRes.send.args[0][0]).to.equal(aMockResponse);
          done();
        });
      });

    });
  });
});