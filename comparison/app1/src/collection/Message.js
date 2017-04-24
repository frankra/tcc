module.exports = (()=>{
  "use strict";
  //Singleton
  
  const Mongoose = require('../core/MongooseManager.js');

  let Schema = new Mongoose.Schema({
    user: String,
    message: String,
    date: Date
  });

  return Mongoose.model('Message', Schema);

})();