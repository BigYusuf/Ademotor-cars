
const express =require('express');
const mongoose =require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    model: { type: String, required: true },
    image: { type: String,default: 'Automatic'  },
    category: { type: Array, required: true },
    description: { type: String, required: true },
    engine: { type: String, required: true },
    speed: { type: String, required: true },
    type: { type: String, required: true, default: 'Automatic' },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    oldNew: { type: String, required: true },
    rating: { type: Number, required: true, default: 0},
    numReviews: { type: Number, required: true, default: 0},
    countInStock: { type: Number, required: true, default: 0}
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
