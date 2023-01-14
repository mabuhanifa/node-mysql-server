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

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM products WHERE id = ?";
  db.query(q,[id], (err, data) => {
    if (err) {
      res.json(err);
    }
    return res.json(data);
  });
});

app.post("/products", (req, res) => {
  const title = req.body.title;
  const info = req.body.info;
  const price = req.body.price;
  const img = req.body.img;

  db.query(
    "INSERT INTO products (title, info, price, img) VALUES (?,?,?,?)",
    [title, info, price, img],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).json({
          message: `Product with title '${title}' created successfully`,
        });
      }
    }
  );
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (result.affectedRows) {
        res.send({
          message: `Product with id '${id}' deleted successfully`,
          result,
        });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
