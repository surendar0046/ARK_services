import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_DATA } from '../constants/businessData';

const FloatingActions = () => {
    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 px-6 md:px-0 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-between items-end">
                {/* WhatsApp Button (Bottom Left) */}
                <motion.a
                    initial={{ opacity: 0, scale: 0.5, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    href={`https://wa.me/${BUSINESS_DATA.whatsappNumbers[0]}`}
                    className="pointer-events-auto w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#1ebd5b] transition-all hover:scale-110 active:scale-90"
                    aria-label="Contact on WhatsApp"
                >
                    <MessageSquare size={32} fill="white" />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-green-200 border-2 border-[#25D366]"></span>
                    </span>
                </motion.a>

                {/* Call Button (Bottom Right) */}
                <motion.a
                    initial={{ opacity: 0, scale: 0.5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    href={`tel:${BUSINESS_DATA.phones[0].value}`}
                    className="pointer-events-auto w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-90"
                    aria-label="Call Now"
                >
                    <Phone size={32} fill="white" />
                    <span className="absolute -top-2 -left-2 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-200 border-2 border-primary"></span>
                    </span>
                </motion.a>
            </div>
        </div>
    );
};

export default FloatingActions;
