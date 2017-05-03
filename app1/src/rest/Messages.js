module.exports = (oApp)=>{
  "use strict";
  
  //Require super class
  const BaseRestAPI = require('./BaseRestAPI.js');
  const MessageCollection = require('../collection/Message.js');
  const BASE_MESSAGES_API = "/api/Messages";

  class Messages extends BaseRestAPI{
    constructor(){
      super(MessageCollection);

      oApp.get(BASE_MESSAGES_API, this.getAll.bind(this));
    }
    
  }

  return new Messages();
};