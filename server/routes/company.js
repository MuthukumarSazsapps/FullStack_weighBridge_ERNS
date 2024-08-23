import express from 'express';
import company from '../controllers/company.js';
const router = express.Router();

router.post('/create', company.createCompany);
router.get('/getCompanyList', company.getallcompanylist);
router.post('/updateCompanyList',company.updateCompanyDetails)
router.post('/deleteCompanyDetails',company.deleteCompanyDetails)

export default router;