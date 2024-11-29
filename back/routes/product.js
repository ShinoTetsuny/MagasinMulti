const express = require('express');
const productController = require('../controllers/product');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/search', productController.searchProducts);
router.get('/detail/:id', productController.getProduct);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/owner/:owner', productController.getProductsByOwner);
router.put('/:id', productController.updateProduct);
router.delete('/:id',auth.isOwnerMiddleware, productController.deleteProduct);

module.exports = router;