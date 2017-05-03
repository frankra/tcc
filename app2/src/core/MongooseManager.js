module.exports = done => {
  "use strict";

  define([
    'tcc.src.external.mongoose'
  ], Mongoose => {
    Mongoose.connect('mongodb://localhost/tcc');
    Mongoose.Promise = global.Promise; //Use native promises

    Mongoose.connection.once('open', () => {
      done(Mongoose); //Only resolve once db connection is stabilished
    });
  });
};