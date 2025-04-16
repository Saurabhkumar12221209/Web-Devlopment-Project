const Product = require('../models/productModel');

// @desc Get all products
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

module.exports = { getProducts };
