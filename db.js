const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

module.exports = db;
