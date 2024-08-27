import express from 'express';
import customer from '../controllers/customer.js';
const router = express.Router();

router.post('/create', customer.createCustomer);
router.get('/getCustomerList',customer.getallCustomerlist);
router.post('/updateCustomerList',customer.updateCustomerDetails)
router.post('/deleteCustomerDetails',customer.deleteCompanyDetails)

export default router;