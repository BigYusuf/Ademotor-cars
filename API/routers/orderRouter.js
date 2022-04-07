
const express =require('express');
const expressAsyncHandler =require('express-async-handler');  
const {google} =require('googleapis');
const nodemailer =require('nodemailer');
const Order =require('../models/orderModel');
const { isAuth, isAdmin, payOrderEmailTemplate, deliverOrderEmailTemplate } = require('../utils/utils');
const dotenv = require('dotenv');

//setting up config file

dotenv.config();

const orderRouter = express.Router();
orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
  })
);
orderRouter.get( '/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res.status(201).send({ message: 'New Order Created', order: createdOrder });
    }
  })
);

orderRouter.get('/:id',isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'email name' );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
     
      const updatedOrder = await order.save();
      
         const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
        oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN})

        async function sendMail(){
          try{
            const accessToken = await oAuth2Client.getAccessToken()
            const transport = nodemailer.createTransport({
              service: 'gmail',
              secure: false,
              auth: {
                type: 'OAuth2',
                user: process.env.USER_EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
                },
                tls:{
                  rejectUnauthorized: false
                }
              });
              const mailOptions ={
                from: `AdeMotors <${process.env.USER_EMAIL}>`,
                to: `${order.user.name} <${order.user.email}>`,
                
                subject: `New order ${order._id}`,
                html: payOrderEmailTemplate(order),
               }
              const result = await transport.sendMail(mailOptions)
              return result

          }catch(error){
            return error
          }
        }
        sendMail().then(result => console.log("Email Sent ", result))

      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete( '/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put( '/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
      oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN})
      
      console.log(order)
      async function sendMail(){
        try{
          const accessToken = await oAuth2Client.getAccessToken()
          const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
              type: 'OAuth2',
              user: process.env.USER_EMAIL,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: accessToken,
              },
              tls:{
                rejectUnauthorized: false
              }
            });
            const mailOptions ={
              from: `AdeMotors <${process.env.USER_EMAIL}>`,
              to: `${order.user.name} <${order.user.email}>`,
              subject: `New order ${order._id}`,
              html: deliverOrderEmailTemplate(order),
             }
            const result = await transport.sendMail(mailOptions)
            return result

        }catch(error){
          return error
        }
      }
      sendMail().then(result => console.log("Email Sent ", result))
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

module.exports = orderRouter;
