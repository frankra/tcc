module.exports = (() => {
  "use strict";

  const Server = require('../external/server.js');
  const oMessageHandler = require('./MessageHandler.js');
  const IO = require('socket.io')(Server);

  class Registry {

    constructor() {
      IO.on('connection', this.registerHandlers);
    }

    registerHandlers(oSocket) {
      oMessageHandler.register(oSocket);
    }
  }

  return new Registry();
})();