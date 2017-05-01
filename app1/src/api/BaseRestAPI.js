module.exports = (() => {
  "use strict";

  class BaseRestAPI {

    constructor(oCollection) {
      this.oCollection = oCollection;
      this.mMap = {};
    }

    getAll(oReq, oRes) {
      return this.oCollection.find().then(aResponse => {
        oRes.status(200).send(aResponse);
      });
    }

    postNew(oReq, oRes) {
      let oNewEntity = new this.oCollection(oReq.body);
      oNewEntity.save().then(oResponse => {
        oRes.status(200).send(oResponse);
      });
    }

    putUpdate(oReq, oRes) {
      //Not Implemented
    }

    delete(oReq, oRes) {
      //Not Implemented
    }
  }

  return BaseRestAPI;
})();