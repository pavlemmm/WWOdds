import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import infoRoutes from './routes/odds.route';
import usersRoutes from './routes/users.route';
import errorHandler from './middleware/errors.middleware';
import { MONGO_URI, PORT, CORS_ORIGIN } from './utils/const.utility';

const app = express();

// Middleware
app.use(
    cors({
        origin: CORS_ORIGIN,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
// app.options('*', cors());

app.use(express.json({ limit: '1mb' })); // 1MB limit for the entire JSON body

// Routes
app.use('/auth', authRoutes);
app.use('/odds', infoRoutes);
app.use('/users', usersRoutes);
app.use(errorHandler);

const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    } catch (err) {
        console.error('Error:', err);
    }
};

startServer();
