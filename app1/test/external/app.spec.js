require('../bootstrap.js');

const FILE_PATH = '../../src/external/app.js';
let app;
let oFakeExpressApp;
let fnFakeExpress;
let fnStaticMiddleware = ()=>{};

describe('app - Tests', () => {

  beforeEach(() => {
    //Mock dependencies
    oFakeExpressApp = {
      use: sinon.spy()
    };
    fnFakeExpress = sinon.stub().returns(oFakeExpressApp);
    fnFakeExpress.static = sinon.stub().returns(fnStaticMiddleware);

    mock('express', fnFakeExpress);

    app = mock.reRequire(FILE_PATH);
  });

  after(()=>{
    mock.stop('express');
  });

  describe('Inspection', () => {
    it('Should execute the Express function', () => {
      chai.expect(fnFakeExpress.callCount).to.equal(1);
      chai.expect(fnFakeExpress.args[0][0]).to.equal(undefined);
    });
    it('Should setup the server static middleware', () => {
      chai.expect(fnFakeExpress.static.callCount).to.equal(1);
      chai.expect(fnFakeExpress.static.args[0][0]).to.equal(process.cwd() + '/src/external' + '/../../../ui/');
      
      chai.expect(oFakeExpressApp.use.callCount).to.equal(1);
      chai.expect(oFakeExpressApp.use.args[0][0]).to.equal(fnStaticMiddleware);
    });
    it('Should be a pointer to the Express App', () => {
      chai.expect(app).to.equal(oFakeExpressApp);
    });
  });
  
});