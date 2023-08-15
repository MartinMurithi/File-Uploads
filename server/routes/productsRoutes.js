const express = require("express");
const route = express.Router();
const productModel = require("../models/product");

route.post("/products/new", async(req, res) => {
  try {
    const data = await productModel.create({ ...req.body });
    res.status(201).json({
      message: "Product created successfully",
        data: data
    });
  } catch (err) {
    res.status(200).json({
      message: "An error occured",
      error: err,
    });
  }
});

route.get("/products", async(req, res) => {
    try {
        const data = await productModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
        message: "GET request is working",
        data: data
    });
  } catch (err) {
    res.json(err);
  }
});
route.get("/products/:id", (req, res) => {
  const { id } = req.params;
  if (id === "23") {
    res.status(200).json({
      message: "Correct Id",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "Incorrect ID",
      id: id,
    });
  }
});

route.patch("/products/:id", (req, res) => {
  res.status(200).json({
    message: "Product updated successfully",
  });
});
route.delete("/products/:id", (req, res) => {
  res.status(200).json({
    message: "Product deleted successfully",
  });
});

module.exports = route;
