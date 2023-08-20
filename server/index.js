require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConnect = require("./config/DBConfig");
const bodParser = require("body-parser");
const routes = require("./routes/productsRoutes");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = 4000;
const app = express();

dbConnect();
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use(bodParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log("Port connected"));
});
