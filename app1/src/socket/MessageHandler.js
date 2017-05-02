module.exports = (() => {
  const NEW_MESSAGE = 'NEW_MESSAGE';
  const Message = require('../collection/Message.js');

  class MessageHandler {

    register(oSocket) {
      oSocket.on(NEW_MESSAGE, this.handleNewMessage.bind(this));
      this._oSocket = oSocket;
    }

    handleNewMessage(oData) {
      return Promise.resolve(oData)
        .then(oData => {
          if (oData) {
            let oNewMessage = new Message(oData);

            return oNewMessage.save();
          } else {
            throw new Error(`Event ${NEW_MESSAGE} received, however, there is no data: ${oData}`);
          }
        })
        .then(oPersistedMessage => {
          this._oSocket.broadcast.emit(NEW_MESSAGE, oPersistedMessage);
        });;
    }
  }

  return new MessageHandler();
})();