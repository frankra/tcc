module.exports = done => {

  define([
    'tcc.src.external.socketio',
    'tcc.src.socket.MessageHandler'
  ], (IO, MessageHandler) => {

    class Registry {

      constructor() {
        IO.on('connection', this.registerHandlers);
      }

      registerHandlers(oSocket) {
        MessageHandler.register(oSocket);
      }
    }

    done(new Registry());
  });
};