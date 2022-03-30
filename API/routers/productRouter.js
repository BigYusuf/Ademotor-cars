const express =require('express');
const expressAsyncHandler =require('express-async-handler');
const Product =require('../models/productModel')
const data = require('../data.js');
const { isAuth, isAdmin } = require('../utils/utils');
const  APIFeatures  = require('../utils/apiFeatures');

const productRouter = express.Router();

//productRouter.get( '/', expressAsyncHandler(async (req, res) => {
  //  const products = await Product.find({});
    //res.send(products);
  //})
//);
productRouter.get( '/popular', expressAsyncHandler(async (req, res) => {
  //  const products = await Product.find({});
  const apiFeatures = new APIFeatures(Product.find({model:"Toyota"}), req.query)
                    .search()
  const products = await apiFeatures.query;
    res.send(products);
  })
);

productRouter.get("/", async (req, res) => {
  //return all new products
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try{
      let products;
          if(qNew){
              products = await Product.find().sort({createdAt:-1}).limit(1) 
          }else if(qCategory){
              products = await Product.find({categories:{
                  $in: [qCategory],
              },
          });
          }else{
              products = await Product.find();
          }
      res.status(200).json(products);
  }catch(err){
      res.status(500).json(err);
  } 
});

productRouter.get( '/seed', expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.get('/show/:showunder', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.ShowUnder);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
productRouter.post('/createproduct', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      model: req.body.model,
      price: req.body.price,
      category: req.body.category,
      engine: req.body.engine,
      speed: req.body.speed,
      type: req.body.type,
      year: req.body.year,
      oldNew: req.body.oldNew,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      description: req.body.description,
    });
    const createdProduct = await product.save();
      res.status(200).send({ message: 'Product Created', product: createdProduct });
  })
);

// update product
productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  
    if(product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    }else{
      res.status(404).send({ message: 'Product Not Found' })
    }
})
);

// delete product
productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if(product) {
      const deleteProduct = await product.remove(); 
      res.send({ message: 'Product Deleted', product: deleteProduct });
  }else{
    res.status(404).send({ message: 'Product Not Found' })
  }
})
);


module.exports = productRouter;