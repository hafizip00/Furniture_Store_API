require("dotenv").config();
const mongoose = require("mongoose");
require("express-async-errors");
//async errors

const express = require("express");
const app = express();

// middleware
const connectDB = require("./db/connect");
const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");
const productsRouter = require("./routes/products");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API </h1><a href='/api/v1/products'>Products</a>");
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

const start = async () => {
  try {
    connectDB(process.env.MONOG_URI);
    app.listen(4000, console.log("Server is running..."));
  } catch (error) {
    console.log("Error");
  }
};

start();
