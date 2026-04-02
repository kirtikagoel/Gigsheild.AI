import Policy from '../models/Policy.js';
import Claim from '../models/Claim.js';

// @desc    Trigger parametric claim (webhook simulation)
// @route   POST /api/claims/trigger-parametric
export const triggerParametricClaim = async (req, res) => {
  try {
    const { workerId, disruptionType, severity } = req.body;
    
    // 1. Find Active Policy
    const activePolicy = await Policy.findOne({ workerId, isActive: true });
    if (!activePolicy) return res.status(404).json({ message: 'No active weekly policy found.' });

    // 2. Parametric condition checking (Zero-touch claim)
    let payout = 0;
    if (disruptionType === 'Heavy Rain' && severity === 'High') {
      payout = 500; // Fixed payout for 1 day of lost wages
    } else if (disruptionType === 'Curfew') {
      payout = 800; 
    } else {
      return res.status(400).json({ message: 'Disruption parameters not met for payout.' });
    }

    // 3. Initiate Claim
    const newClaim = new Claim({
      policyId: activePolicy._id,
      workerId,
      disruptionType,
      payoutAmount: payout,
      status: 'Approved' // Zero-touch instant approval for parametric
    });

    await newClaim.save();
    res.status(200).json({ message: 'Parametric Claim Automatically Triggered & Approved', claim: newClaim });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};