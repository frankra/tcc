module.exports = (()=>{
  "use strict";
  
  //Singleton
  const Mongoose = require('mongoose');
  Mongoose.connect('mongodb://localhost/tcc');
  Mongoose.Promise = global.Promise; //Use native promises

  return Mongoose;
})();