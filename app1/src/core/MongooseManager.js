module.exports = (()=>{
  "use strict";
  
  //Singleton
  const Mongoose = require('mongoose');
  Mongoose.connect('mongodb://localhost/awdaw');
  Mongoose.Promise = global.Promise; //Use native promises

  return Mongoose;
})();