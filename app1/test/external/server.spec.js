require('../bootstrap.js');

const FILE_PATH = '../../src/external/server.js';
let Server;
let oFakeServer;
let oFakeHTTP;
let oFakeApp; 

describe('server - Tests', () => {

  beforeEach(() => {
    //Mock dependencies
    oFakeApp = {};
    oFakeServer = {};
    oFakeHTTP = {
      createServer: sinon.stub().returns(oFakeServer)
    };
    mock('../../src/external/app.js', oFakeApp);
    mock('http', oFakeHTTP);

    Server = mock.reRequire(FILE_PATH);
  });

  after(()=>{
    mock.stop('../../src/external/app.js');
    mock.stop('http');
  });

  describe('Inspection', () => {
    it('Should create an HTTP server using the App as parameter', () => {
      chai.expect(oFakeHTTP.createServer.callCount).to.equal(1);
      chai.expect(oFakeHTTP.createServer.args[0][0]).to.equal(oFakeApp);
    });
    it('Should return the Server instance', () => {
      chai.expect(Server).to.equal(oFakeServer);
    });
   
  });
  
});