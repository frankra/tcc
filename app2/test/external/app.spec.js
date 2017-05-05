require('../bootstrap.js');

let fnFakeExpress;
let oFakeApp;
const fnServeStaticMiddleware = ()=>{};

describe('App - Tests', () => {

  before(() => {
    //Mock dependencies
    oFakeApp = {
      use: sinon.spy()
    }
    fnFakeExpress = sinon.stub().returns(oFakeApp);
    fnFakeExpress.static = sinon.stub().returns(fnServeStaticMiddleware);

    injectjs.core.Import.setModule('tcc.src.external.express', fnFakeExpress);
  });

  describe('Inspection', () => {
    it('Should be an object', (done) => {
      define([
        'original.tcc.src.external.app'
      ], App=>{
        chai.expect(typeof App).to.equal('object');
        done();
      });
    });
    it('Should create the App dependency', (done) => {
      define([
        'original.tcc.src.external.app'
      ], App=>{
        chai.expect(fnFakeExpress.callCount).to.equal(1);
        done();
      });
    });
    it('Should setup the Serve Static middleware', (done) => {
      define([
        'original.tcc.src.external.app'
      ], App=>{
        chai.expect(fnFakeExpress.static.callCount).to.equal(1);
        chai.expect(fnFakeExpress.static.args[0][0]).to.equal(process.cwd() + '/src/external' + '/../../../ui/');
        chai.expect(oFakeApp.use.callCount).to.equal(1);
        chai.expect(oFakeApp.use.args[0][0]).to.equal(fnServeStaticMiddleware);
        done();
      });
    });
  });
  
});