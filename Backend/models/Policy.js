import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  weekStartDate: { type: Date, required: true },
  weekEndDate: { type: Date, required: true },
  weeklyPremium: { type: Number, required: true }, // Calculated Dynamically
  coverageAmount: { type: Number, required: true }, // Max loss of income coverage per week
  isActive: { type: Boolean, default: true }
});

export default mongoose.model('Policy', policySchema);