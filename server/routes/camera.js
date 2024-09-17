import express from 'express';
import camera from '../controllers/camera.js';
const router = express.Router();

router.post('/snap', camera.cameraScreenShot);
// router.get('/live', company.getallcompanylist);


export default router;