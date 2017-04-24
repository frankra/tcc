module.exports = (()=>{
  "use strict";
  
  //Singleton
  const Mongoose = require('mongoose');
  Mongoose.connect('mongodb://localhost/app1');

  return Mongoose;
})();