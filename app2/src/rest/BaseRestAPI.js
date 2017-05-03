module.exports = done => {
  "use strict";

  class BaseRestAPI {
    constructor(oCollection) {
      this.oCollection = oCollection;
    }

    getAll(oReq, oRes) {
      return this.oCollection.find().then(aResponse => {
        oRes.status(200).send(aResponse);
      });
    }
  }

  done(BaseRestAPI);
};