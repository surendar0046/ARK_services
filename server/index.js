import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Booking from './models/Booking.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
let cachedDb = null;
const connectDB = async () => {
    if (cachedDb && mongoose.connection.readyState === 1) {
        return cachedDb;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        cachedDb = db;
        console.log('✅ MONGO DB CONNECTED SUCCESSFULLY');
        return db;
    } catch (err) {
        console.error('❌ MONGO DB CONNECTION ERROR:', err.message);
        throw err;
    }
};

// Root Route
app.get('/', (req, res) => {
    res.send(`ARK TRUE COOL TECH Backend Server is Running! DB Status: ${isMongoConnected ? '✅ Connected' : '❌ Disconnected'}`);
});

// API Routes
app.get('/api/bookings', async (req, res) => {
    try {
        await connectDB();
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        console.error("GET /api/bookings error:", error);
        res.status(500).json({ message: "Database connection failed or error occurred." });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        await connectDB();
        console.log("POST /api/bookings request body:", req.body);
        const bookingData = req.body;
        const newBooking = new Booking({
            bookingId: bookingData.id,
            timestamp: bookingData.timestamp,
            name: bookingData.name,
            phone: bookingData.phone,
            address: bookingData.address,
            service: bookingData.service,
            specialization: bookingData.specialization || '',
            date: bookingData.date,
            status: bookingData.status || 'Pending'
        });
        await newBooking.save();
        console.log("Booking saved to MongoDB:", newBooking.bookingId);
        res.status(201).json(newBooking);
    } catch (error) {
        console.error("POST /api/bookings error:", error);
        res.status(400).json({ message: "Failed to save booking. Check DB connection." });
    }
});

app.patch('/api/bookings/:id/status', async (req, res) => {
    try {
        await connectDB();
        const { status, adminNotes } = req.body;
        const updated = await Booking.findOneAndUpdate(
            { bookingId: req.params.id },
            { status, adminNotes: adminNotes || "" },
            { new: true }
        );
        if (updated) return res.json(updated);
        res.status(404).json({ message: "Booking not found" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    try {
        await connectDB();
        await Booking.findOneAndDelete({ bookingId: req.params.id });
        res.json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
