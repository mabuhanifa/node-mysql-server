const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to SQL SERVER!");
});

module.exports = db;
