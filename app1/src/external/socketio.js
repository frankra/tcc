module.exports = (()=>{
  const Server = require('./server.js');
  return require('socket.io')(Server);
})();