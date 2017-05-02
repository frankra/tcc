require('../bootstrap.js');

const FILE_PATH = '../../src/socket/Registry.js';
let Registry;
let fnSocketIO;
let oFakeSocketIO;

describe('Registry - Tests', () => {

  beforeEach(() => {
    //Mock dependencies
    oFakeSocketIO = {
      connect: sinon.stub()
    }
    fnSocketIO = sinon.stub().returns(oFakeSocketIO);
    mock('socket.io', fnSocketIO);
    mock('../../src/collection/Message.js', {
      find: sinon.stub().returns(Promise.resolve())
    });

    Registry = mock.reRequire(FILE_PATH);
  });

  after(()=>{
    mock.stop('socket.io');
    mock.stop('../../src/collection/Message.js');
  });

  describe('Inspection', () => {
    it('Should be a function', () => {
      chai.expect(typeof Registry).to.equal("function");
    });
  });
  
});