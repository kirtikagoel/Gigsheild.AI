import Policy from '../models/Policy.js';

// @desc    Calculate dynamic premium
// @route   POST /api/insurance/calculate-premium
export const calculatePremium = async (req, res) => {
  try {
    const { zone } = req.body;
    let basePremium = 50; // ₹50 per week base
    
    // MOCK AI/Predictive Risk Logic
    let riskMultiplier = 1.0;
    let riskFactor = "Normal";

    if (zone.toLowerCase().includes('waterlogging') || zone.toLowerCase().includes('mumbai')) {
      riskMultiplier = 1.2; // 20% higher risk
      riskFactor = "High probability of heavy rain/waterlogging";
    } else if (zone.toLowerCase().includes('safe')) {
      riskMultiplier = 0.9; // Dynamic discount
      riskFactor = "Historically safe zone";
    }

    const finalPremium = Math.round(basePremium * riskMultiplier);
    
    res.status(200).json({
      basePremium,
      finalPremium,
      coverageAmount: 2000, // Provides upto ₹2000 wage protection per week
      riskFactor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Buy weekly policy
// @route   POST /api/insurance/buy-policy
export const buyPolicy = async (req, res) => {
  try {
    const { workerId, finalPremium, coverageAmount } = req.body;
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7); // Strict Weekly cycle

    const policy = new Policy({
      workerId,
      weekStartDate: startDate,
      weekEndDate: endDate,
      weeklyPremium: finalPremium,
      coverageAmount
    });
    
    await policy.save();
    res.status(201).json({ message: 'Weekly Policy Activated', policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};