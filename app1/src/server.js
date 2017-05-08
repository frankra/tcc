module.exports = (()=>{
  "use strict";

  const Express = require('express');
  const App = Express();
  const Server = require('http').createServer(App);
  const Mongoose = require('./core/MongooseManager.js');
  const PORT = 3000;

  require('./rest/Messages')(App); //Initialize Rest API
  require('./socket/Registry.js')(Server);
  App.use(Express.static(__dirname + '/../../ui/')); //Serve UI

  Mongoose.connection.once('open', ()=>{ //Wait for DB connection
    Server.listen(PORT, ()=>{
      console.log(`App without node-injectjs up and running at localhost:${PORT}`);
    });
  });
})(); 