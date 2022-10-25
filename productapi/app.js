require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");
const productsRouter = require("./routes/products");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/products/", productsRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, () => {
      app.listen(process.env.PORT, () => {
        console.log(`db connection success`);
        console.log(`server workin on *:${process.env.PORT}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
