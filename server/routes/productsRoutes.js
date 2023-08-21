const express = require("express");
const router = express.Router();
const { mongoose } = require("mongoose");
const productModel = require("../models/product");
const { upload, fileSizeLimitErrorHandler } = require("../config/multer");

router.post(
  "/products/new",
  upload.single("image"),
  fileSizeLimitErrorHandler,
  async (req, res) => {
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
      res.status(201).json(response);
    } catch (err) {
      res.status(500).json({
        message: "An error occured",
        error: err.message,
      });
    }
  }
);

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
    const product = await productModel.findById(_id).select("-__v");
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
