import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.route.ts';
import infoRoutes from './routes/info.route.ts';
import { MONGO_URI, PORT } from './utils/const.utility.ts';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' })); // 1MB limit for the entire JSON body

// Routes
app.use('/auth', authRoutes);
app.use('/info', infoRoutes);

try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT}`));
} catch (err) {
    console.error('Error:', err);
}
