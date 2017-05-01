module.exports = (()=>{
  "use strict";

  const Express = require('express');
  const App = Express();
  const Server = require('http').createServer(App);
  const Mongoose = require('./core/MongooseManager.js');
  const PORT = 3000;

  Mongoose.connection.once('open', ()=>{ //Wait for DB connection

    require('./api/Messages')(App); //Initialize Rest API

    Server.listen(PORT, ()=>{
      console.log(`App without node-injectjs up and running at localhost:${PORT}`);
    });
    App.use(Express.static(__dirname + '/../../ui/')); //Serve UI

    require('./socket/Registry.js')(Server);
  });
})(); 