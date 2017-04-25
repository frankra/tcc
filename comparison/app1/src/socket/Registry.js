module.exports = (Server) => {
  const IO = require('socket.io')(Server);
  const MessageCollection = require('../collection/Message.js');
  
  IO.on('connection', (oSocket) => {

    oSocket.on('NEW_MESSAGE', (oData) => {
      if (oData){
        let oNewMessage = new MessageCollection(oData);

        oNewMessage.save()
        .then(oPersistedMessage=>{
          oSocket.broadcast.emit('NEW_MESSAGE', oPersistedMessage);
        });
      }
      
    });
  });
}