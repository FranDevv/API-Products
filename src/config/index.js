require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DBNAME,
}