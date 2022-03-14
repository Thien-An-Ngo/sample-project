import express from 'express';
import { getUser, newUser } from '../controllers/authController';

const router = express.Router();

router.get('/getUser', getUser);
router.post('/newUser', newUser);

export default router;
