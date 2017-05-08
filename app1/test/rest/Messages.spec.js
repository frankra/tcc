require('../bootstrap.js');

const FILE_PATH = '../../src/rest/Messages';
const BASE_REST_API_PATH = '../../src/rest/BaseRestAPI'
let Messages;
let oMockApp;
let oMockMessageCollection;

describe('Messages - Tests', () => {

  beforeEach(() => {
    oMockApp = {
      get: sinon.spy()
    }
    //Mock dependencies
    oMockMessageCollection = {
      find: sinon.stub().returns(Promise.resolve())
    };
    mock('../../src/collection/Message.js', oMockMessageCollection);
    mock('../../src/external/app.js', oMockApp);

    Messages = mock.reRequire(FILE_PATH);
  });

  after(()=>{
    mock.stop('../../src/collection/Message.js');
    mock.stop('../../src/external/app.js');
  });

  describe('Inspection', () => {
    it('Should be an object', () => {
      chai.expect(typeof Messages).to.equal('object');
    });
    it('Should be a child of BaseRestAPI', () => {
      let BaseRestAPI = require(BASE_REST_API_PATH);

      chai.expect(Messages instanceof BaseRestAPI).to.equal(true);
    });
    it('Should provide the MessageCollection to the constructor', () => {
     

      chai.expect(
        Messages.oCollection === oMockMessageCollection
      ).to.equal(true);
    });
    it('Should register the getAll API to the App.get function', () => {
      let BaseRestAPI = require(BASE_REST_API_PATH);
      let sExpectedPath = '/api/Messages';

      chai.expect(oMockApp.get.callCount).to.equal(1);
      chai.expect(oMockApp.get.args[0][0]).to.equal(sExpectedPath);

      chai.expect(
        Messages.getAll.constructor === oMockApp.get.args[0][1].constructor
      ).to.equal(true);
    });
  });
});