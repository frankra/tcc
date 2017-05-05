require('../bootstrap.js');

let oFakeServer;
let oFakeSocketIO;
let fnFakeSocketIO;

describe('SocketIO - Tests', () => {
  before(() => {
    oFakeServer = {};
    oFakeSocketIO = {};
    fnFakeSocketIO = sinon.stub().returns(oFakeSocketIO);
    mock('socket.io', fnFakeSocketIO);

    injectjs.core.Import.setModule('tcc.src.external.server', oFakeServer);
  });

  after(() => {
    mock.stop('socket.io');
  });

  describe('Inspection', () => {
    it('Should create the SocketIO', (done) => {
      define([
        'original.tcc.src.external.socketio'
      ], SocketIO => {
        chai.expect(fnFakeSocketIO.callCount).to.equal(1);
        chai.expect(fnFakeSocketIO.args[0][0]).to.equal(oFakeServer);
        done();
      });
    });
    it('Should return an instance of the SocketIO', (done) => {
      define([
        'original.tcc.src.external.socketio'
      ], SocketIO => {
        chai.expect(SocketIO).to.equal(oFakeSocketIO);
        done();
      });
    });
  });
});