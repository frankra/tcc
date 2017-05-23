module.exports = (()=>{
  "use strict";

  const PORT = 3000;

  let injectjs = require('node-injectjs')();
  global.injectjs = injectjs;
  injectjs.core.Import.mapModulePath('tcc.src','/src/');

  define([
    'tcc.src.external.server',
    'tcc.src.rest.Messages', //Required just to initialize it
    'tcc.src.socket.Registry' //Required just to initialize it
  ],(Server)=>{
    Server.listen(PORT, ()=>{
      console.log(`App with node-injectjs up and running at localhost:${PORT}`);
    });
  });
})(); 