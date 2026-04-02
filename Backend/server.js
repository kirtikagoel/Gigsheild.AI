import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Route Imports
import workerRoutes from './routes/workerRoutes.js';
import insuranceRoutes from './routes/insuranceRoutes.js';
import claimRoutes from './routes/claimRoutes.js';

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes mounting
app.use('/api/workers', workerRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/claims', claimRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('ProtectGig Backend API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});