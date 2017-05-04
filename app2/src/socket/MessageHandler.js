module.exports = done => {
  "use strict";
  
  const NEW_MESSAGE = 'NEW_MESSAGE';

  define([
    'tcc.src.collection.Message'
  ], Message => {
    class MessageHandler {

      register(oSocket) {
        this._oSocket = oSocket;
        oSocket.on(NEW_MESSAGE, this.handleNewMessage.bind(this));
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
          });
      }
    }

    done(new MessageHandler());
  });
};