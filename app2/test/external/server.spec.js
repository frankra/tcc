require('../bootstrap.js');

let oFakeApp;
let oFakeHTTP;
let oFakeServer;

describe('Server - Tests', () => {
  before(()=>{
    oFakeServer = {};
    oFakeApp = {};
    oFakeHTTP = {
      createServer: sinon.stub().returns(oFakeServer)
    };

    injectjs.core.Import.setModule('tcc.src.external.http', oFakeHTTP);
    injectjs.core.Import.setModule('tcc.src.external.app', oFakeApp);
  });

  describe('Inspection', () => {
    it('Should be an object', (done) => {
      define([
        'original.tcc.src.external.server'
      ], Server=>{
        chai.expect(typeof Server).to.equal('object');
        done();
      });
    });
    it('Should create the server', (done) => {
      define([
        'original.tcc.src.external.server'
      ], Server=>{
        chai.expect(oFakeHTTP.createServer.callCount).to.equal(1);
        chai.expect(oFakeHTTP.createServer.args[0][0]).to.equal(oFakeApp);
        done();
      });
    });
    it('Should return an instance of the Server', (done) => {
      define([
        'original.tcc.src.external.server'
      ], Server=>{
        chai.expect(Server).to.equal(oFakeServer);
        done();
      });
    });
  });
});