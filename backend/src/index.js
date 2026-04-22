import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import companyRoutes from './routes/company.routes.js';
import statRoutes from './routes/stat.routes.js';
import authRoutes from './routes/auth.routes.js';
import supportRoutes from './routes/support.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/companies', companyRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/support', supportRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: '🚀 PlaceTrack API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
