module.exports = (() => {
  "use strict";

  const Server = require('./external/server.js');
  const Mongoose = require('./core/MongooseManager.js');
  const PORT = 3000;

  require('./rest/Messages');
  require('./socket/Registry.js');
  
  Mongoose.connection.once('open', () => { //Wait for DB connection
    Server.listen(PORT, () => {
      console.log(`App without node-injectjs up and running at localhost:${PORT}`);
    });
  });
})(); 