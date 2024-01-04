require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

require("./DB/conn");

const cors = require("cors");

const Product = require("./modals/productModal");
const router = require("./Routes/router");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World! Mehwish");
});

// server start
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
