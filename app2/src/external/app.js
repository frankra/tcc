module.exports = done => {
  "use strict";

  define([
    'tcc.src.external.express'
  ], (Express) => {
    let App = Express();

    App.use(Express.static(__dirname + '/../../../ui/')); //Serve UI
    
    done(App);
  });
};