require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dbConnect = require('./config/DBConfig');
const bodParser = require('body-parser');
const routes = require('./routes/productsRoutes');
const bodyParser = require('body-parser');

const uploads = multer({ destination: 'uploads/ ' });
// uploads, a folder where multer will store the FileSystem.  The folder is not publicly accesible, so we make it static

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
dbConnect();


app.listen(PORT, () => {
    console.log('Port connected');
});
