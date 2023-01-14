const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

// getting all products from the database
app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) {
      res.json(err);
    }
    return res.json(data);
  });
});

// getting a product from the database by id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM products WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) {
      res.json(err);
    }
    return res.json(data);
  });
});

// creating a product
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

// deleting a product by id
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

// updating a product by id
app.put("/products/:id", (req, res) => {
  const { id } = req.params;

  const q =
    "UPDATE products SET `title`= ?, `info`= ?, `price`= ?, `img`= ? WHERE id = ?";

  const values = [req.body.title, req.body.info, req.body.price, req.body.img];
  console.log(values);
  db.query(q, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
