var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  User = mongoose.model('User');



  module.exports.createUser = function(req, res, next) {
    var valid =
      req.body.email &&
      Validations.isString(req.body.email) &&
      req.body.username &&
      Validations.isString(req.body.username)
      req.body.password &&
      Validations.isString(req.body.password);
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'name(String) and price(Number) are required fields.',
        data: null
      });
    }
    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;
  
    Product.create(req.body, function(err, product) {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        err: null,
        msg: 'Product was created successfully.',
        data: product
      });
    });
  };
  //function(req,res,next)
//   module.exports.createUser = function(res) {
//     var uData = {
//         // email: req.body.email,
//         // username: req.body.username,
//         // password: req.body.password,
//         // passwordConf: req.body.passwordConf,
//         email:'amr.attia@gmail.com',
//         username:'amrattia',
//         password:'nopassword',
//         passwordConf:'nopassword'

//       }
    
//       //use schema.create to insert data into the db
//       User.create(uData, function (err, user) {
//         // if (err) {
//         //   return next(err)
//         // } else {
//         //   return res.redirect('/profile');
//         // }
//       });
    
   
//   }

