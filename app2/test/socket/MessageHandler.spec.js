return
require('../bootstrap.js');

const FILE_PATH = '../../src/socket/MessageHandler.js';
let MessageHandler;
let oFakeMessages;
let oFakeMessage;
let oFakeSocket;

describe('MessageHandler - Tests', () => {

  beforeEach(() => {
    //Mock Dependencies
    oFakeMessage = {
      save: sinon.stub().returns(Promise.resolve())
    }
    oFakeMessages = sinon.stub().returns(oFakeMessage);

    mock('../../src/collection/Message.js', oFakeMessages);

    oFakeSocket = {
      on: sinon.spy(),
      broadcast: {
        emit: sinon.spy()
      }
    }

    MessageHandler = mock.reRequire(FILE_PATH);
  });

  after(()=>{
    mock.stop('../../src/collection/Message.js');
  });

  describe('Inspection', () => {
    it('Should be an object', () => {
      chai.expect(typeof MessageHandler).to.equal("object");
    });
  });

  describe('API', () => {
    describe('register', () => {
      it('Should register the handler to the socket event', () => {
        MessageHandler.register(oFakeSocket);

        chai.expect(oFakeSocket.on.callCount).to.equal(1);
        chai.expect(oFakeSocket.on.args[0][0]).to.equal('NEW_MESSAGE');
        chai.expect(
          MessageHandler.handleNewMessage.constructor === oFakeSocket.on.args[0][1].constructor
        ).to.equal(true);
        chai.expect(MessageHandler._oSocket === oFakeSocket).to.equal(true);
      });
    });
    describe('handleNewMessage', () => {
      beforeEach(() => {
        MessageHandler.register(oFakeSocket);
      })
      it('Should create new a Message if the data is provided, then broadcast it', (done) => {
        let oData = {};
        let oPromise = MessageHandler.handleNewMessage(oData);

        oPromise.then(() => {
          chai.expect(oFakeMessages.callCount).to.equal(1);
          chai.expect(oFakeMessages.args[0][0]).to.equal(oData);

          chai.expect(oFakeMessage.save.callCount).to.equal(1);

          done();
        });
      });

      it('Should fail if the data is no provided', (done) => {
        let oPromise = MessageHandler.handleNewMessage(/*null*/);
       
        oPromise.catch(e=>{
           chai.expect(e instanceof Error).to.equal(true);
           done();
        });
      });

    });
  });

});