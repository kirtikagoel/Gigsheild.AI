import express from 'express';
import { triggerParametricClaim } from '../controllers/claimController.js';

const router = express.Router();

router.post('/trigger-parametric', triggerParametricClaim);

export default router;