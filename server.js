const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) {
      res.json(err);
    }
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
