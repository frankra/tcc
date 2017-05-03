module.exports = done => {
  "use strict";
  define([
    'tcc.src.external.server'
  ],(Server)=>{
    done(require('socket.io')(Server));
  })
};