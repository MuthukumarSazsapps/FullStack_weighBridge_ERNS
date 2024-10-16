import express from 'express';
import User from '../controllers/user.js';
const router = express.Router();

router.post('/create', User.createUser);
router.get('/getAllUserList',User.getAllUserList);
router.post('/updateUserDetails',User.updateUserDetails)
router.post('/deleteUserDetails',User.deleteUserDetails)

export default router;