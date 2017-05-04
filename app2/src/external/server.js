module.exports = done => {
  "use strict";
  
  define([
    'tcc.src.external.http',
    'tcc.src.external.app'
  ],(HTTP, App)=>{
    done(HTTP.createServer(App));
  });
};