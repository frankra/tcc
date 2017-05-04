require('../bootstrap.js');

let Messages;
let oFakeApp;
let oFakeMessageCollection;

describe('Messages - Tests', () => {

  before(() => {
    //Create fake dependencies 
    oFakeApp = {
      get: sinon.spy()
    }
    oFakeMessageCollection = {
      find: sinon.stub().returns(Promise.resolve())
    }

    //Set fake dependencies
    injectjs.core.Import.setModule('tcc.src.collection.Message', oFakeMessageCollection);
    injectjs.core.Import.setModule('tcc.src.external.app', oFakeApp);

  });


  describe('Inspection', () => {
    it('Should be an Object (Singleton)', (done) => {
      define([
        'original.tcc.src.rest.Messages'
      ], Messages => {
        chai.expect(typeof Messages).to.equal('object');
        done();
      });
    });
    it('Should be a child of BaseRestAPI', (done) => {
      define([
        'original.tcc.src.rest.Messages',
        'tcc.src.rest.BaseRestAPI',
      ], (Messages, BaseRestAPI) => {
        
        chai.expect(Messages instanceof BaseRestAPI).to.equal(true);
        done();
      });
    });
    it('Should set the Message Collection at the super constructor', (done) => {
      define([
        'original.tcc.src.rest.Messages',
        'original.tcc.src.rest.BaseRestAPI',
      ], (Messages, BaseRestAPI) => {
        chai.expect(
          Messages.oCollection === oFakeMessageCollection
        ).to.equal(true);
        done();
      });
    });
    it('Should register the getAll API to the App.get function', (done) => {
      define([
        'original.tcc.src.rest.Messages',
        'original.tcc.src.rest.BaseRestAPI',
      ], (Messages, BaseRestAPI) => {
        let sExpectedPath = '/api/Messages';

        chai.expect(oFakeApp.get.callCount).to.equal(1);
        chai.expect(oFakeApp.get.args[0][0]).to.equal(sExpectedPath);

        chai.expect(
          Messages.getAll.constructor === oFakeApp.get.args[0][1].constructor
        ).to.equal(true);
        done();
      });
    });
  });
});