require('../bootstrap.js');

let fnFakeSocketIO;
const oFakeServer = {};
let oFakeMessageHandler;
const oFakeSocket = {};

describe('Registry - Tests', () => {

  before(() => {
    //Mock dependencies
    oFakeSocketIO = {
      on: sinon.stub()
    }

    oFakeMessageHandler = {
      register: sinon.spy()
    }

    injectjs.core.Import.setModule('tcc.src.external.socketio', oFakeSocketIO);
    injectjs.core.Import.setModule('tcc.src.socket.MessageHandler', oFakeMessageHandler);
  });

  describe('Inspection', () => {

    it('Should attach the registerHandlers API on the "connection" callback', (done) => {
      define([
        'original.tcc.src.socket.Registry'
      ], Registry => {
        chai.expect(oFakeSocketIO.on.callCount).to.equal(1);
        chai.expect(oFakeSocketIO.on.args[0][0]).to.equal("connection");
        chai.expect(oFakeSocketIO.on.args[0][1]).to.equal(Registry.registerHandlers);
        done();
      });
    });
    it('Should be an object', (done) => {
      define([
        'original.tcc.src.socket.Registry'
      ], Registry => {
        chai.expect(typeof Registry).to.equal("object");
        done();
      });
    });
    it('Should be a singleton', (done) => {
      define([
        'original.tcc.src.socket.Registry',
        'original.tcc.src.socket.Registry'
      ], (Registry1, Registry2) => {
        chai.expect(Registry1 === Registry2).to.equal(true);
        done();
      });
    });
  });

  describe('API', () => {
    describe('registerHandlers', () => {
      it('Should register all Socket All Handlers', (done) => {
        define([
          'original.tcc.src.socket.Registry',
          'original.tcc.src.socket.Registry'
        ], (Registry1, Registry2) => {
          oFakeSocketIO.on.args[0][1](oFakeSocket);

          chai.expect(oFakeMessageHandler.register.callCount).to.equal(1);
          chai.expect(oFakeMessageHandler.register.args[0][0]).to.equal(oFakeSocket);
          done();
        });
      });
    });
  });

});