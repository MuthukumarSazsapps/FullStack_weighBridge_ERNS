import express from 'express';
import weighing from '../controllers/weighing.js';
const router = express.Router();

router.post('/create', weighing.createWeighing);
router.get('/getAllWeighingList',weighing.getAllWeighingList)

export default router;
