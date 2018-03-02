var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Encryptions = require('../utils/Encryption'),
  Product = mongoose.model('Product');
  User = mongoose.model('User');



  module.exports.createUser = function(req, res, next) {
    var valid =
      req.body.username &&
      Validations.isString(req.body.username) &&
      req.body.password &&
      Validations.isString(req.body.password);
      req.body.component &&
      Validations.isNumber(req.body.component);
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: req.body.username+' '+req.body.password+' '+'name(String) and password(string) are required fields.',
        data: null
      });
    }
    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;
    //req.body.password=Encryptions.hashPassword(req.body.password,function(){
      
    //});
    User.findOne({
      username: req.body.username.trim().toLowerCase(),
      
    }, function(err, user) {
  

      if (user) {
        res.json({ success: false, message: 'Username already taken' });
      } else{
        User.create(req.body, function(err, user) {
          if (err) {
            return next(err);
          }
          res.status(201).json({
            err: null,
            msg: 'user was created successfully.',
            data: user
          });
        });
      }
    
  
    });
   
  };
  // Login
  module.exports.Login = function(req, res, next) {
    var valid =
      req.body.username &&
      Validations.isString(req.body.username)
      req.body.password &&
      Validations.isString(req.body.password);
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'Username or Password is incorrect.',
        data: null
      });
    }
  
    User.findOne({
        username: req.body.username.trim().toLowerCase(),
        password: req.body.password
      }, function(err, user) {
    
        // if (err) throw err;
 
        if (!user) {
          res.json({ success: false, message: 'Login failed. User not found.' });
        } else{
          res.json({ success: true, message: 'Logged in successfully' ,jwt_token:"to be generated",user_id:user.id,user_name:user.username,user_component:user.component});
        }
        // else {
    
        //   // check if password matches
        //   if ((Encryptions.comparePasswordToHash(user.password, req.body.password.trim().toLowerCase()))) {
        //     res.json({ success: false, message: user +'Login failed. Wrong password.' });
        //   } else {

        //     res.json({ success: true, message: 'Logged in successfully' ,jwt_token:"to be generated",user_id:user.id,user_name:user.username,user_component:user.component});
        //   }  
    
        // }
    
      });
  };

  module.exports.FindProductByUserID = function(req, res, next) {
    if (!Validations.isObjectId(mongoose.Types.ObjectId(req.body.userId))) {
      return res.status(422).json({
        err: null,
        msg: typeof(req.body.userId)+' '+'User did not create products.',
        data: null
      });
    }

  
    Product.find({
      userId: req.body.userId
    })
    .exec(function(err, products) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg:
          'Products Created By This User ' +
          ' retrieved successfully.',
        data: products
      });
    });
  };

  module.exports.FindProductByComponent = function(req, res, next) {
    if (!Validations.isNumber(req.body.component)) {
      return res.status(422).json({
        err: null,
        msg: req.body.component+' '+'Component did not create any products',
        data: null
      });
    }

  
    Product.find({
      component: req.body.component
    })
    .exec(function(err, products) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg:
          'Products Created By This Component retrieved successfully.',
        data: products
      });
    });
  };