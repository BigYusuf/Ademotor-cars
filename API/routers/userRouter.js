
const express =require('express');
const expressAsyncHandler =require('express-async-handler');
const User =require('../models/userModel')
const {generateToken, isAuth, isAdmin} =require('../utils/utils')
const bcrypt = require('bcryptjs'); 
const data = require('../data.js');

const userRouter = express.Router();
userRouter.get('/seed',expressAsyncHandler(async (req, res) => {
    //if you want to remove all your users before inserting many, do this befor created users
   // await User.remove({});

    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers});
})
);

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })
  );

  
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const createdUser = await user.save();
  res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    image: createdUser.image,
    isAdmin: createdUser.isAdmin,
    isSeller: user.isSeller,
    token: generateToken(user),
  });
})
);

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if(user) {
    res.send(user);
  }else{
    res.status(401).send({ message: 'User Not Found' });
  }
})
);
// update user
userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);
userRouter.get('/',isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
    res.send(users);
    
})
);

// delete user
userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if(user) {
      const deleteUser = await user.remove(); 
      res.send({ message: 'User Deleted', user: deleteUser });
  }else{
    res.status(404).send({ message: 'User Not Found' })
  }
})
);

// update user
userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  
    if(user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = req.body.isSeller || user.isSeller;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
     
  const updatedUser = await user.save();
  res.send({ message: 'User Updated', user: updatedUser });
  }else{
    res.status(404).send({ message: 'User Not Found' })
  }
})
);

module.exports = userRouter;