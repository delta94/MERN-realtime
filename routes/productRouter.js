const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');

router.get('/products', productCtrl.getProducts);
router.patch('/product/:id', productCtrl.reviews);

module.exports = router;
