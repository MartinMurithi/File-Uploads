require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dbConnect = require("./config/DBConfig");
const bodParser = require("body-parser");
const routes = require("./routes/productsRoutes");
const bodyParser = require("body-parser");

const uploads = multer({ destination: "uploads/ " });
// uploads, a folder where multer will store the FileSystem.  The folder is not publicly accesible, so we make it static

const PORT = 4000;
const app = express();

dbConnect();

// write the CORS headers

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    return res.status(200).json({});
    }
    next()
});

app.use(cors());
app.use(express.json());
app.use(bodParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log("Port connected");
});
