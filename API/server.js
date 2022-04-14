const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');
const allproductRouter = require('./routers/allproductRouter');
const connectDatabase = require('../API/config/database');
const path = require('path');

const app = express();
app.use(express.json());
//app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(cors({ credentials: true, origin: "https://car-shop-ademoto.herokuapp.com"}));
app.use(express.urlencoded({ extended: true }));

//HAndle Uncaught exceptions
process.on('uncaughtException', err =>{
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down the server due to Uncaught exception`);
    process.exit(1)
})

//setting up config file
dotenv.config();
//connecting to connectDatabase
connectDatabase();

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/allproducts', allproductRouter);// testing purpose remove it later

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
  );
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
