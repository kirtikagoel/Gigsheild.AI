import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  platform: { type: String, required: true }, // 'Zomato' or 'Swiggy'
  zone: { type: String, required: true },     // e.g., 'Koramangala, Bangalore'
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Worker', workerSchema);