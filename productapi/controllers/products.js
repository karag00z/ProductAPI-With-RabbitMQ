const Product = require("../models/products");
const fs = require("fs");
const { uploadImage } = require("../utils/helper");
const { publisher } = require("../utils/rabbitmq");

const fetchAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!products) return res.status(422).json({ msg: "no products" });
  res.send(products);
};

const fetchProduct = async (req, res) => {
  const { productID } = req.params;
  const product = await Product.findById(productID);
  if (!product) return res.status(422).json({ msg: "no product " });
  res.send(product);
};

const createProduct = async (req, res) => {
  if (!req.files) return res.status(400).json({ error: "Set image" });
  const images = [];
  const { title, description } = req.body;
  if (!title && !description) return res.status(400).json({ error: "set title & description" });
  const product = new Product({ title: title, description: description });
  await product.save();
  for (file in req.files) {
    const imagePath = req.files[file].path;
    console.log(imagePath);
    const url = await uploadImage(imagePath, product._id.toString()); //
    fs.unlinkSync(imagePath);
    images.push({ url: url, alt: "" });
  }
  product.images = images;
  await product.save();
  await publisher(product._id.toString());
  res.send("OK");
};
module.exports = {
  fetchAllProducts,
  createProduct,
  fetchProduct,
};
