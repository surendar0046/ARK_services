import React, { useState } from 'react';
import { X, Calendar, Phone, MapPin, User, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_DATA } from '../constants/businessData';

const BookingForm = ({ serviceId, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        service: serviceId || BUSINESS_DATA.services[0].id,
        specialization: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const API_URL = "/api/bookings";

        try {
            const payload = {
                id: "BOOK" + new Date().getTime(),
                timestamp: new Date().toLocaleString(),
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                service: BUSINESS_DATA.services.find(s => s.id === formData.service)?.title || formData.service,
                specialization: formData.specialization,
                date: formData.date,
                status: "Pending"
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to save booking');

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Booking error:", error);
            alert("Booking failed. Please ensure the backend server is running and your MongoDB connection is active.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                {!isSuccess ? (
                    <div className="p-8 sm:p-10">
                        <div className="mb-8">
                            <h3 className="text-3xl font-black text-gray-900 mb-2">Book a Service</h3>
                            <p className="text-gray-500 font-medium">Professional service at your doorstep.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="relative">
                                <User className="absolute left-4 top-4 text-gray-400" size={20} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Your Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold text-gray-900"
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
                                <input
                                    required
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold text-gray-900"
                                />
                            </div>

                            <div className="relative">
                                <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                                <textarea
                                    required
                                    placeholder="Address / Area Details"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold text-gray-900 min-h-[100px] resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-4 col-span-1 sm:col-span-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Service</label>
                                            <select
                                                value={formData.service}
                                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white p-4 rounded-2xl outline-none transition-all font-bold text-gray-900 appearance-none"
                                            >
                                                {BUSINESS_DATA.services.map(s => (
                                                    <option key={s.id} value={s.id}>{s.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Specialization</label>
                                            <select
                                                required
                                                value={formData.specialization}
                                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white p-4 rounded-2xl outline-none transition-all font-bold text-gray-900 appearance-none"
                                            >
                                                <option value="" disabled>Choose Detail</option>
                                                <option value="Install">Installation</option>
                                                <option value="Service">Service / Maintenance</option>
                                                <option value="Complaint">Complaint</option>
                                                <option value="Doubt">Doubt / Inquiry</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 col-span-1 sm:col-span-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute right-4 top-4 text-gray-400" size={20} />
                                        <input
                                            required
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white p-4 rounded-2xl outline-none transition-all font-bold text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>Book Service Call</>
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="p-16 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
                        >
                            <CheckCircle size={48} />
                        </motion.div>
                        <h3 className="text-4xl font-black text-gray-900 mb-4">Call Booked Successfully</h3>
                        <p className="text-gray-500 text-lg font-medium">
                            Our technician will contact you shortly to confirm the appointment.
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default BookingForm;
