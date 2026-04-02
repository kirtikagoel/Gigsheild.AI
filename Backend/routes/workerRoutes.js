import express from 'express';
import { registerWorker, getWorkerDashboard } from '../controllers/workerController.js';

const router = express.Router();

router.post('/register', registerWorker);
router.get('/:id/dashboard', getWorkerDashboard);

export default router;