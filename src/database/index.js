const debug = require("debug")("app:module-database");
const { MongoClient } = require("mongodb");

const { Config } = require("../config/index");

var connection = null;
module.exports.Database = (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        const client = new MongoClient(Config.mongoUri);
        connection = await client.connect();
        debug("New connection done with MongoDB Atlas");
      }
      debug("Re-using conection");
      const db = connection.db(Config.dbName);
      resolve(db.collection(collection));
    } catch (error) {
      reject(error);
    }
  });
