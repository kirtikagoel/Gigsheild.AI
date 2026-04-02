import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  disruptionType: { type: String, required: true }, // e.g., 'Heavy Rain', 'Curfew'
  date: { type: Date, default: Date.now },
  payoutAmount: { type: Number, required: true },
  status: { type: String, enum: ['Approved', 'Processing', 'Rejected'], default: 'Processing' }
});

export default mongoose.model('Claim', claimSchema);