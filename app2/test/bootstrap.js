module.exports = (()=>{
  "use strict";

  let injectjs = require('node-injectjs')();
  global.injectjs = injectjs;
  injectjs.core.Import.mapModulePath('tcc.src','../src/');
  injectjs.core.Import.mapModulePath('original.tcc.src','../src/');

  global.chai = require('chai');
  global.sinon = require('sinon');
  global.mock = require('mock-require');
})();