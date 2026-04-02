import Worker from '../models/Worker.js';
import Policy from '../models/Policy.js';
import Claim from '../models/Claim.js';

// @desc    Register new worker
// @route   POST /api/workers/register
export const registerWorker = async (req, res) => {
  try {
    const { name, phone, platform, zone } = req.body;
    const newWorker = new Worker({ name, phone, platform, zone });
    await newWorker.save();
    res.status(201).json({ message: 'Worker registered successfully', worker: newWorker });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get dashboard data for a worker
// @route   GET /api/workers/:id/dashboard
export const getWorkerDashboard = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    const policy = await Policy.findOne({ workerId: req.params.id, isActive: true });
    const claims = await Claim.find({ workerId: req.params.id }).sort({ date: -1 });
    
    res.status(200).json({ worker, policy, claims });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};