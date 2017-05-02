require('../bootstrap.js');

const FILE_PATH = '../../src/socket/Registry.js';
let Registry;
let fnFakeSocketManager;
const oFakeServer = {};
let oFakeMessageHandler;
const oFakeSocket = {};

describe('Registry - Tests', () => {

  beforeEach(() => {
    //Mock dependencies
    oFakeSocketManager = {
      getSocketPromise: sinon.stub().returns(Promise.resolve(oFakeSocket))
    }
    fnFakeSocketManager = sinon.stub().returns(oFakeSocketManager);
    mock('../../src/socket/SocketManager.js', fnFakeSocketManager);

    oFakeMessageHandler = {
      register: sinon.spy()
    }
    mock('../../src/socket/MessageHandler.js', oFakeMessageHandler);

    Registry = mock.reRequire(FILE_PATH);
  });

  after(() => {
    mock.stop('../../src/socket/SocketManager.js');
    mock.stop('../../src/socket/MessageHandler.js');
  });

  describe('Inspection', () => {
    it('Should require and initialize the SocketManager', () => {
      Registry(oFakeServer);
      chai.expect(fnFakeSocketManager.callCount).to.equal(1);
      chai.expect(fnFakeSocketManager.args[0][0]).to.equal(oFakeServer);
    });
    it('Should require and initialize the SocketManager', (done) => {
      let oPromise = Registry(oFakeServer);

      oPromise.then(() => {
        chai.expect(fnFakeSocketManager.callCount).to.equal(1);
        chai.expect(fnFakeSocketManager.args[0][0]).to.equal(oFakeServer);
        done();
      });
    });
    it('Should register all Promise Handlers', (done) => {
      let oPromise = Registry(oFakeServer);

      oPromise.then(() => {
        chai.expect(oFakeMessageHandler.register.callCount).to.equal(1);
        chai.expect(oFakeMessageHandler.register.args[0][0]).to.equal(oFakeSocket);
        done();
      });
    });
    it('Should be a function', () => {
      chai.expect(typeof Registry).to.equal("function");
    });
  });

});