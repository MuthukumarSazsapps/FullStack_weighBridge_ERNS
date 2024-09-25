import express from 'express';
import VehicleType from '../controllers/vehicleType.js';
import VehicleNumber from '../controllers/vehicleNumber.js';

const router = express.Router();
//vehicle type api
router.post('/create', VehicleType.createVehicle);
router.get('/getAllVehicleTypeList',VehicleType.getAllVehicleList);
router.post('/updateVehicleTypeDetails',VehicleType.updateVehicleDetails)
router.post('/deleteVehicleTypeDetails',VehicleType.deleteVehicleDetails)
//vehicle Number apti
router.post('/createNumber', VehicleNumber.createVehicleNumber);
router.get('/getAllVehicleNumberList',VehicleNumber.getAllVehicleNumberList);
router.post('/updateVehicleNumberDetails',VehicleNumber.updateVehicleNumberDetails)
router.post('/deleteVehicleNumberDetails',VehicleNumber.deleteVehicleNumberDetails)

export default router;