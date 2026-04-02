import express from 'express';
import { calculatePremium, buyPolicy } from '../controllers/insuranceController.js';

const router = express.Router();

router.post('/calculate-premium', calculatePremium);
router.post('/buy-policy', buyPolicy);

export default router;