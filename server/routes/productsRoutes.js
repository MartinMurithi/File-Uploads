const express = require("express");
const router = express.Router();
const { v4 : uuid } = require('uuid');
const { mongoose } = require("mongoose");
const multer = require("multer");
const productModel = require("../models/product");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const name = `${uuid()} `
    cb(null, `${name}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else if (file.size >= 1024 * 1024 * 2) {
    cb(("File is to big, select files under 1 mb,"), false);
  }
  else {
    cb(("Invalid file type, only jpg and png are allowed!!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: fileFilter
});


router.post("/products/new", upload.single("image"), async (req, res) => {
  try {
    const product = new productModel({
      image: req.file.path,
      name: req.body.name,
      price: req.body.price,
    });
    await product.save();
    const response = {
      message: "Product created successfully",
      product: product,
    };
    console.log(product.image);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({
      message: "An error occured",
      error: err,
    });
  }
});

router.get("/products", async (req, res) => {
  try {
    const data = await productModel
      .find()
      .select("-__v")
      .sort({ createdAt: -1 });
    const response = {
      count: data.length,
      products: data,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/products/:id", async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(500).json({ error: "id is not valid!!" });
      return;
    }
    const product = await productModel
      .findById(_id)
      .select("-__v");
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ message: "Product does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// router.patch("/products/:id", (req, res) => {
//   res.status(200).json({
//     message: "Product updated successfully",
//   });
// });
// router.delete("/products/:id", (req, res) => {
//   res.status(200).json({
//     message: "Product deleted successfully",
//   });
// });

module.exports = router;
