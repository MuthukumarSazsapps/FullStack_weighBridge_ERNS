import express from 'express';
import weighing from '../controllers/weighing.js';
const router = express.Router();

router.post('/create', weighing.createWeighing);
router.get('/getAllWeighingList',weighing.getAllWeighingList)
router.get('/getSecondWeightList',weighing.getSecondWeightList)
router.post('/updateWeighingDetails',weighing.updateWeighingDetails)
router.post('/deleteWeighingDetails',weighing.deleteWeighingDetails)


export default router;


