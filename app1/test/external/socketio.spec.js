require('../bootstrap.js');

const FILE_PATH = '../../src/external/socketio.js';
let IO;
let oFakeIO;
let fnFakeSocketIO;
let oFakeServer;

describe('socketio - Tests', () => {

  beforeEach(() => {
    //Mock dependencies
    oFakeIO = {};
    oFakeServer = {};
    fnFakeSocketIO = sinon.stub().returns(oFakeIO);
    
    mock('socket.io', fnFakeSocketIO);
    mock('../../src/external/server.js', oFakeServer);


    IO = mock.reRequire(FILE_PATH);
  });

  after(()=>{
    mock.stop('socket.io');
    mock.stop('../../src/external/server.js');
  });

  describe('Inspection', () => {
    it('Should init the SocketIO dependency using the Server as parameter', () => {
      chai.expect(fnFakeSocketIO.callCount).to.equal(1);
      chai.expect(fnFakeSocketIO.args[0][0]).to.equal(oFakeServer);
    });
    it('Should return the IO instance', () => {
      chai.expect(IO).to.equal(oFakeIO);
    });
  });
});