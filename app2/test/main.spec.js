require('./bootstrap.js');

let Main;
let oFakeMain;
const oFakeMessages = {};
const oFakeRegistry = {};
let fnFakeNodeInjectjs;
let oFakeInjectjs;
let oFakeImport;

describe('Main - Tests', () => {

  before(() => {
    //Create fake dependencies
    oFakeMain = {
      listen: sinon.stub()
    }

    oFakeImport = {
      mapModulePath: sinon.spy()
    }

    oFakeInjectjs = {
      core: {
        Import: oFakeImport
      }
    }

    fnFakeNodeInjectjs = sinon.stub().returns(oFakeInjectjs);
    //Set fake dependencies

    injectjs.core.Import.setModule('tcc.src.external.server', oFakeMain);
    injectjs.core.Import.setModule('tcc.src.rest.Messages', oFakeMessages);
    injectjs.core.Import.setModule('tcc.src.socket.Registry', oFakeRegistry);

    mock('node-injectjs', fnFakeNodeInjectjs);
    
    sinon.spy(global,'define');
    
    Main = require('../src/main.js');
  });

  after(() => {
    mock.stop('node-injectjs');
    global.define.restore();
    global.injectjs = require('node-injectjs')();
    injectjs.core.Import.mapModulePath('tcc.src', '../src/');
    injectjs.core.Import.mapModulePath('original.tcc.src', '../src/');
  })

  describe('Initialize Injectjs Framework', () => {
    it('Should setup the Injectjs environment', () => {
      chai.expect(fnFakeNodeInjectjs.callCount).to.equal(1);
      chai.expect(global.injectjs).to.equal(oFakeInjectjs);
      chai.expect(oFakeImport.mapModulePath.callCount).to.equal(1);
      chai.expect(oFakeImport.mapModulePath.args[0][0]).to.equal('tcc.src');
      chai.expect(oFakeImport.mapModulePath.args[0][1]).to.equal('/src/');
    });

    it('Should define the required dependencies', () => {
      chai.expect(define.callCount).to.equal(1);
      chai.expect(Array.isArray(define.args[0][0])).to.equal(true);
      //Test required dependencies
      chai.expect(define.args[0][0][0]).to.equal('tcc.src.external.server');
      chai.expect(define.args[0][0][1]).to.equal('tcc.src.rest.Messages');
      chai.expect(define.args[0][0][2]).to.equal('tcc.src.socket.Registry');

      chai.expect(typeof define.args[0][1]).to.equal('function');
    });

    describe('Once Dependencies are provided', () => {
      it('Should attach the listen event to the server instance', () => {
        chai.expect(oFakeMain.listen.callCount).to.equal(1);
        chai.expect(oFakeMain.listen.args[0][0]).to.equal(3000);
        chai.expect(typeof oFakeMain.listen.args[0][1]).to.equal('function');
      });
      describe('Once server is listening', () => {
        before(() => {
          sinon.spy(console, 'log');
          oFakeMain.listen.args[0][1]();
        });
        after(() => {
          console.log.restore();
        })

        it('Should inform the use that the app is running', () => {
          chai.expect(console.log.callCount).to.equal(1);
          chai.expect(typeof console.log.args[0][0]).to.equal("string");
        });

      });
    });
  });
});