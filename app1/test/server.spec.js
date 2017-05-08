
require('./bootstrap.js');

const FILE_PATH = '../src/server.js';
let Server;
let oFakeServer;
let oFakeMongooseManager;
let fnFakeMessages;
let fnFakeRegistry;
const fnStaticMiddleware = () => { };

describe('Server - Tests', () => {

  beforeEach(() => {
    //Create fake dependencies
    fnFakeMessages = sinon.spy();

    oFakeServer = {
      listen: sinon.spy()
    }

    fnFakeRegistry = sinon.stub();

    oFakeMongooseManager = {
      connection: {
        once: sinon.spy()
      }
    }

    //Set fake dependencies
    mock('../src/external/server.js', oFakeServer);
    mock('../src/core/MongooseManager', oFakeMongooseManager);
    mock('../src/rest/Messages', fnFakeMessages);
    mock('../src/socket/Registry.js', fnFakeRegistry);

    Server = mock.reRequire(FILE_PATH);
  });

  after(() => {
    mock.stop('express');
    mock.stop('http');
    mock.stop('../src/core/MongooseManager');
    mock.stop('../src/rest/Messages');
    mock.stop('../src/socket/Registry.js');
  });

  describe('Bootstrap', () => {
    it('Should attach an event listener to the DB connection, so that once the DB connection estabilishes the app should start', () => {

      chai.expect(oFakeMongooseManager.connection.once.callCount).to.equal(1);
      chai.expect(oFakeMongooseManager.connection.once.args[0][0]).to.equal('open');
      chai.expect(typeof oFakeMongooseManager.connection.once.args[0][1]).to.equal('function');
    });

    describe('Once DB Connected', () => {
      beforeEach(() => {
        oFakeMongooseManager.connection.once.args[0][1]();
      });

      it('Should initialize the Messages Rest API', () => {
        chai.expect(require.callCount).to.equal(1);
        chai.expect(fnFakeMessages.args[0][0]).to.equal(oFakeApp);
      });

      it('Should attach the listen event to the server instance', () => {
        chai.expect(oFakeServer.listen.callCount).to.equal(1);
        chai.expect(oFakeServer.listen.args[0][0]).to.equal(3000);
        chai.expect(typeof oFakeServer.listen.args[0][1]).to.equal('function');
      });

      it('Should add the serve static middleware to the app instance', () => {
        chai.expect(oFakeApp.use.callCount).to.equal(1);
        chai.expect(fnFakeExpress.static.callCount).to.equal(1);

        chai.expect(fnFakeExpress.static.args[0][0]).to.equal(process.cwd() + '/src/../../ui/');
        chai.expect(oFakeApp.use.args[0][0]).to.equal(fnStaticMiddleware);

        chai.expect(fnFakeRegistry.callCount).to.equal(1);
        chai.expect(fnFakeRegistry.args[0][0]).to.equal(oFakeServer);
      });
      describe('Once server is listening', () => {
        before(() => {
          sinon.spy(console,'log');
          oFakeServer.listen.args[0][1]();
        });
        after(()=>{
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