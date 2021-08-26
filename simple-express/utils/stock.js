const mysql = require("mysql");
require("dotenv").config();
const Promise = require("bluebird");

let connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECT || 10,
});

// connection = Promise.promisifyAll(connection);

module.exports = connection;
