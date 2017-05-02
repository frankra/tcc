module.exports = (Server) => {
  const oSocketManager = require('./SocketManager.js')(Server);
  const oMessageHandler = require('./MessageHandler.js');
  
  return oSocketManager.getSocketPromise()
  .then(oSocket=>{
    oMessageHandler.register(oSocket);
  });
}