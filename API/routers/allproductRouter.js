const express =require('express');
const expressAsyncHandler =require('express-async-handler');
const Product =require('../models/productModel')

const productRouter = express.Router();


productRouter.get( '/', expressAsyncHandler(async (req, res) => {
  const products = await Product.find();
  res.send( products);
})
);
module.exports = productRouter;