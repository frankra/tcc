return
require('../bootstrap.js');

const FILE_PATH = '../../src/socket/Registry.js';
let Registry;
let fnFakeSocketIO;
const oFakeServer = {};
let oFakeMessageHandler;
const oFakeSocket = {};

describe('Registry - Tests', () => {

  beforeEach(() => {
    //Mock dependencies
    oFakeSocketIO = {
      on: sinon.stub()
    }
    fnFakeSocketIO = sinon.stub().returns(oFakeSocketIO);
    mock('socket.io', fnFakeSocketIO);

    oFakeMessageHandler = {
      register: sinon.spy()
    }
    mock('../../src/socket/MessageHandler.js', oFakeMessageHandler);

    Registry = mock.reRequire(FILE_PATH);
  });

  after(() => {
    mock.stop('socket.io');
    mock.stop('../../src/socket/MessageHandler.js');
  });

  describe('Inspection', () => {
    it('Should initialize the Socket IO dependency with the Server instance', () => {
      Registry(oFakeServer);

      chai.expect(fnFakeSocketIO.callCount).to.equal(1);
      chai.expect(fnFakeSocketIO.args[0][0]).to.equal(oFakeServer);
    });
    it('Should attach the registerHandlers API on the "connection" callback', () => {
      let oInstance = Registry(oFakeServer);

      chai.expect(oFakeSocketIO.on.callCount).to.equal(1);
      chai.expect(oFakeSocketIO.on.args[0][0]).to.equal("connection");
      chai.expect(oFakeSocketIO.on.args[0][1]).to.equal(oInstance.registerHandlers);
    });
    it('Should be a function', () => {
      chai.expect(typeof Registry).to.equal("function");
    });
    it('Should return a Registry instance if executed', () => {
      chai.expect(typeof Registry(oFakeServer)).to.equal("object");
    });
  });

  describe('API', () => {
    describe('registerHandlers', () => {
      it('Should register all Socket All Handlers', () => {
        Registry(oFakeServer);

        //Fake 'connection' callback call
        oFakeSocketIO.on.args[0][1](oFakeSocket);

        chai.expect(oFakeMessageHandler.register.callCount).to.equal(1);
        chai.expect(oFakeMessageHandler.register.args[0][0]).to.equal(oFakeSocket);
      });
    });
  });

});