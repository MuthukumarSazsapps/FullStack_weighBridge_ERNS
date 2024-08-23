import express from 'express';
import company from '../controllers/company.js';
const router = express.Router();

router.post('/create', company.createCompany);
router.get('/getCompanyList', company.getallcompanylist);

export default router;