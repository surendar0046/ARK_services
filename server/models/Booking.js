import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    timestamp: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    service: { type: String, required: true },
    specialization: { type: String, default: '' },
    date: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    adminNotes: { type: String, default: '' }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
