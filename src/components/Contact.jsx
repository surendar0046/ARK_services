import React from 'react';
import { Phone, MapPin, Instagram, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { BUSINESS_DATA } from '../constants/businessData';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-primary text-white overflow-hidden relative">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-sm font-black text-blue-200 uppercase tracking-[0.3em] mb-3">Get In Touch</h2>
                        <h3 className="text-4xl md:text-5xl font-black mb-8">Ready to assist you <br />right now.</h3>

                        <div className="space-y-10 mt-12">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-2">Call Us</p>
                                    {BUSINESS_DATA.phones.map((phone, idx) => (
                                        <a
                                            key={idx}
                                            href={`tel:${phone.value}`}
                                            className="block text-2xl font-black hover:text-blue-100 transition-colors"
                                        >
                                            {phone.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-2">Our Address</p>
                                    <p className="text-xl font-bold leading-relaxed">
                                        {BUSINESS_DATA.address.line1}<br />
                                        {BUSINESS_DATA.address.line2}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Instagram size={24} />
                                </div>
                                <div>
                                    <p className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-2">Social Media</p>
                                    <a
                                        href={BUSINESS_DATA.social.instagram.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl font-bold hover:text-blue-100 transition-colors flex items-center gap-2"
                                    >
                                        @{BUSINESS_DATA.social.instagram.id}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl relative"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <span className="text-4xl">📍</span>
                        </div>
                        <h4 className="text-gray-900 text-3xl font-black mb-6">Contact Us Today</h4>
                        <p className="text-gray-500 mb-10 text-lg">
                            Click the button below to start a WhatsApp chat or give us a direct call. We are ready to help!
                        </p>

                        <div className="space-y-4">
                            <a
                                href={`tel:${BUSINESS_DATA.phones[0].value}`}
                                className="flex items-center justify-center gap-4 bg-primary text-white w-full py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                            >
                                <Phone /> Direct Call
                            </a>
                            <a
                                href={`https://wa.me/${BUSINESS_DATA.whatsappNumbers[0]}`}
                                className="flex items-center justify-center gap-4 bg-[#25D366] text-white w-full py-5 rounded-2xl font-bold text-xl hover:bg-[#1ebd5b] transition-all shadow-xl shadow-green-500/20 active:scale-[0.98]"
                            >
                                <MessageSquare /> WhatsApp Us
                            </a>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                            <p className="text-gray-400 font-medium">Service Coverage: Karaikudi, Koviloor & Surrounding Areas</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
