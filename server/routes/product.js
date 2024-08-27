import express from 'express';
import Product from '../controllers/product.js';
const router = express.Router();

router.post('/create', Product.createProduct);
router.get('/getAllProductList',Product.getAllProductList);
router.post('/updateProductDetails',Product.updateProductDetails)
router.post('/deleteProductDetails',Product.deleteProductDetails)

export default router;