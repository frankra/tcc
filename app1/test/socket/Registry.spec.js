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
    mock('../../src/external/server.js', oFakeServer);

    Registry = mock.reRequire(FILE_PATH);
  });

  after(() => {
    mock.stop('socket.io');
    mock.stop('../../src/socket/MessageHandler.js');
    mock.stop('../../src/external/server.js');
  });

  describe('Inspection', () => {
    it('Should initialize the Socket IO dependency with the Server instance', () => {

      chai.expect(fnFakeSocketIO.callCount).to.equal(1);
      chai.expect(fnFakeSocketIO.args[0][0]).to.equal(oFakeServer);
    });
    it('Should attach the registerHandlers API on the "connection" callback', () => {

      chai.expect(oFakeSocketIO.on.callCount).to.equal(1);
      chai.expect(oFakeSocketIO.on.args[0][0]).to.equal("connection");
      chai.expect(oFakeSocketIO.on.args[0][1]).to.equal(Registry.registerHandlers);
    });
    it('Should be an object', () => {
      chai.expect(typeof Registry).to.equal("object");
    });
  });

  describe('API', () => {
    describe('registerHandlers', () => {
      it('Should register all Socket All Handlers', () => {

        //Fake 'connection' callback call
        oFakeSocketIO.on.args[0][1](oFakeSocket);

        chai.expect(oFakeMessageHandler.register.callCount).to.equal(1);
        chai.expect(oFakeMessageHandler.register.args[0][0]).to.equal(oFakeSocket);
      });
    });
  });

});