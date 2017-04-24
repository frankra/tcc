module.exports = (()=>{
  "use strict";

  const Express = require('express');
  const App = Express();
  const Mongoose = require('./core/MongooseManager.js');

  Mongoose.connection.once('open', ()=>{ //Wait for DB connection

    require('./api/Messages')(App); //Initialize Rest API

    App.listen(3000, ()=>{
      console.log('App without DI up and running!');
    });
  });

  /*
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });*/

  
})(); 