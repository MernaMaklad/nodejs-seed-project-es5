var express = require('express'),
  router = express.Router(),
  productCtrl = require('../controllers/ProductController');
  userCtrl = require('../controllers/UserController');
//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', productCtrl.getProducts);
router.get('/product/getPProducts', productCtrl.getPProducts);
router.get('/product/getProduct/:productId', productCtrl.getProduct);
router.get('/product/getProductsBelowPrice/:price',productCtrl.getProductsBelowPrice);
router.post('/product/createProduct', productCtrl.createProduct);
router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);

//-------------------------------user Routes-----------------------------------
router.post('/user/createUser', userCtrl.createUser);

module.exports = router;
