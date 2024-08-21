import express from 'express';
import login from '../controllers/login.js';
const router = express.Router();

router.get('/getAllLoginUser', login.getAllLoginUser);
router.post('/valid', login.login);

export default router;