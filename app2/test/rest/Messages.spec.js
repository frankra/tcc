return
require('../bootstrap.js');

const FILE_PATH = '../../src/rest/Messages';
const BASE_REST_API_PATH = '../../src/rest/BaseRestAPI'
let Messages;
let oMockApp;

describe('Messages - Tests', () => {

  beforeEach(() => {
    oMockApp = {
      get: sinon.spy()
    }
    //Mock dependencies
    mock('../../src/collection/Message.js', {
      find: sinon.stub().returns(Promise.resolve())
    });

    Messages = require(FILE_PATH);
  });

  after(()=>{
    mock.stop('../../src/collection/Message.js');
  });

  describe('Inspection', () => {
    it('Should be a function', () => {
      chai.expect(typeof Messages).to.equal('function');
    });
    it('Should fail on execution if the App instance is not provided', () => {
      chai.expect(() => {
        let oObj = Messages();
      }).to.throw(Error);
    });
    it('Should return a Messages instance if the App instance is provided', () => {
      let oInstance = Messages(oMockApp);
      chai.expect(typeof oInstance).to.equal('object');
    });
    it('Should be a child of BaseRestAPI', () => {
      let oInstance = Messages(oMockApp);
      let BaseRestAPI = require(BASE_REST_API_PATH);

      chai.expect(oInstance instanceof BaseRestAPI).to.equal(true);
    });
    it('Should register the getAll API to the App.get function', () => {
      let oInstance = Messages(oMockApp);
      let BaseRestAPI = require(BASE_REST_API_PATH);
      let sExpectedPath = '/api/Messages';

      chai.expect(oMockApp.get.callCount).to.equal(1);
      chai.expect(oMockApp.get.args[0][0]).to.equal(sExpectedPath);

      chai.expect(
        oInstance.getAll.constructor === oMockApp.get.args[0][1].constructor
      ).to.equal(true);
    });
  });


});