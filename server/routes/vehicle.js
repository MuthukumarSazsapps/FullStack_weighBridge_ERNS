import express from 'express';
import Vehicle from '../controllers/vehicle.js';
const router = express.Router();

router.post('/create', Vehicle.createVehicle);
router.get('/getAllVehicleList',Vehicle.getAllVehicleList);
router.post('/updateVehicleDetails',Vehicle.updateVehicleDetails)
router.post('/deleteVehicleDetails',Vehicle.deleteVehicleDetails)

export default router;