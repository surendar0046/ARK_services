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
let isMongoConnected = false;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        isMongoConnected = true;
        console.log('====================================');
        console.log('✅ MONGO DB CONNECTED SUCCESSFULLY');
        console.log('====================================');
    } catch (err) {
        isMongoConnected = false;
        console.log('====================================');
        console.log('❌ MONGO DB CONNECTION ERROR');
        console.error(err.message);

        console.log('\n💡 IMPORTANT (Thanglish FIX):');
        console.log('Ungaloda IP Address MongoDB Atlas-la whitelist pannanum.');
        console.log('1. MongoDB Atlas Dashboard-ku ponga.');
        console.log('2. Left side-la "Network Access" click pannunga.');
        console.log('3. "Add IP Address" kudunka.');
        console.log('4. "Allow Access From Anywhere" (0.0.0.0/0) Select pannunga.');
        console.log('5. Confirm kuduthutu 1-2 mins wait panni project-ai refresh pannunga.');
        console.log('====================================');
    }
};

connectDB();

// Root Route
app.get('/', (req, res) => {
    res.send(`ARK TRUE COOL TECH Backend Server is Running! DB Status: ${isMongoConnected ? '✅ Connected' : '❌ Disconnected'}`);
});

// API Routes
app.get('/api/bookings', async (req, res) => {
    if (!isMongoConnected) {
        return res.status(503).json({ message: "Database not connected. Please check Atlas IP Whitelist." });
    }
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        console.error("GET /api/bookings error:", error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    if (!isMongoConnected) {
        return res.status(503).json({ message: "Database not connected. Please check Atlas IP Whitelist." });
    }
    console.log("POST /api/bookings request body:", req.body);
    const bookingData = req.body;
    try {
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
        res.status(400).json({ message: error.message });
    }
});

app.patch('/api/bookings/:id/status', async (req, res) => {
    if (!isMongoConnected) {
        return res.status(503).json({ message: "Database not connected." });
    }
    const { status, adminNotes } = req.body;
    try {
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
    if (!isMongoConnected) {
        return res.status(503).json({ message: "Database not connected." });
    }
    try {
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
