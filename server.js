const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;