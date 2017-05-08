module.exports = (()=>{
  const Express = require('express');
  const App = Express();
  App.use(Express.static(__dirname + '/../../../ui/')); //Serve UI
  return App;
})();