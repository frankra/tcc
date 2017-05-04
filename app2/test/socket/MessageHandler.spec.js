require('../bootstrap.js');

let oFakeMessages;
let oFakeMessage;
let oFakeSocket;

describe('MessageHandler - Tests', () => {

  before(() => {
    //Mock Dependencies
    oFakeMessage = {
      save: sinon.stub().returns(Promise.resolve())
    }
    oFakeMessages = sinon.stub().returns(oFakeMessage);

    injectjs.core.Import.setModule('tcc.src.collection.Message', oFakeMessages);

    oFakeSocket = {
      on: sinon.spy(),
      broadcast: {
        emit: sinon.spy()
      }
    };
  });

  describe('Inspection', () => {
    it('Should be an object', (done) => {
      define([
        'original.tcc.src.socket.MessageHandler',
      ], (MessageHandler) => {
        chai.expect(typeof MessageHandler).to.equal("object");
        done();
      });
    });
    it('Should be a singleton', (done) => {
      define([
        'original.tcc.src.socket.MessageHandler',
        'original.tcc.src.socket.MessageHandler'
      ], (MessageHandler1, MessageHandler2) => {
        chai.expect(MessageHandler1 === MessageHandler2).to.equal(true);
        done();
      });
    });
  });

  describe('API', () => {
    describe('register', () => {
      it('Should register the handler to the socket event', (done) => {
        define([
          'original.tcc.src.socket.MessageHandler',
        ], (MessageHandler) => {
          MessageHandler.register(oFakeSocket);

          chai.expect(oFakeSocket.on.callCount).to.equal(1);
          chai.expect(oFakeSocket.on.args[0][0]).to.equal('NEW_MESSAGE');
          chai.expect(
            MessageHandler.handleNewMessage.constructor === oFakeSocket.on.args[0][1].constructor
          ).to.equal(true);
          chai.expect(MessageHandler._oSocket === oFakeSocket).to.equal(true);
          done();
        });
      });
    });
    describe('handleNewMessage', () => {
      it('Should create new a Message if the data is provided, then broadcast it', (done) => {
        define([
          'original.tcc.src.socket.MessageHandler',
        ], (MessageHandler) => {
          let oData = {};
          let oPromise = MessageHandler.handleNewMessage(oData);

          oPromise.then(() => {
            chai.expect(oFakeMessages.callCount).to.equal(1);
            chai.expect(oFakeMessages.args[0][0]).to.equal(oData);

            chai.expect(oFakeMessage.save.callCount).to.equal(1);

            done();
          });
        });

      });

      it('Should fail if the data is no provided', (done) => {
        define([
          'original.tcc.src.socket.MessageHandler',
        ], (MessageHandler) => {
          let oPromise = MessageHandler.handleNewMessage(/*null*/);

          oPromise.catch(e => {
            chai.expect(e instanceof Error).to.equal(true);
            done();
          });
        });
      });
    });
  });
});