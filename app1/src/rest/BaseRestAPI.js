module.exports = (() => {
  "use strict";

  class BaseRestAPI {
    constructor(oCollection) {
      this.oCollection = oCollection;
    }

    getAll(oRes) {
      return this.oCollection.find().then(aResponse => {
        oRes.status(200).send(aResponse);
      });
    }

    //postNew
    //putUpdate
    //deleteById
  }

  return BaseRestAPI;
})();