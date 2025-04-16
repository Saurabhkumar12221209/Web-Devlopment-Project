const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: String,
  price: Number,
  category: String,
  image: String,
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
