module.exports = (() => {
  "use strict";

  const IO = require('../external/socketio.js');
  const oMessageHandler = require('./MessageHandler.js');

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