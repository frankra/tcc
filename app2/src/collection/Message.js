module.exports = done => {
  "use strict";

  define([
    'tcc.src.core.MongooseManager'
  ], Mongoose => {

    let Schema = new Mongoose.Schema({
      user: String,
      message: String,
      date: {
        type: Date,
        default: Date.now
      }
    });

    done(Mongoose.model('Message', Schema));
  });
};