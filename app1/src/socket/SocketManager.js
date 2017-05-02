module.exports = (Server) => {
  const IO = require('socket.io')(Server);

  class SocketManager{
    constructor(){
      this._socketPromise = new Promise((fnResolve)=>{
        IO.on('connection', fnResolve);
      });
    }

    getSocketPromise(){
      return this._socketPromise;
    }
  }
  
  return new SocketManager();
};