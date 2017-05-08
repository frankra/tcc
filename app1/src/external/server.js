module.exports = (()=>{
  const App = require('./app.js');
  return require('http').createServer(App);
})();