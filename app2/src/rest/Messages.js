module.exports = done => {
  "use strict";

  const BASE_MESSAGES_API = "/api/Messages";

  define([
    'tcc.src.rest.BaseRestAPI',
    'tcc.src.collection.Message',
    'tcc.src.external.app'
  ], (BaseRestAPI, MessageCollection, App) => {
    
    class Messages extends BaseRestAPI {
      constructor() {
        super(MessageCollection);

        App.get(BASE_MESSAGES_API, this.getAll.bind(this));
      }
    }

    done(new Messages());
  });
};