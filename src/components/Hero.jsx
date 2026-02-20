import React from 'react';
import { Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BUSINESS_DATA } from '../constants/businessData';

const Hero = () => {
    return (
        <section id="home" className="relative pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-blue-50 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-blue-100 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 text-center md:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-bold mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                            </span>
                            24/7 Professional Support
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
                            Reliable Solutions For Your <span className="text-primary italic">Home & Office</span>
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-primary">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="h-8 w-[1px] bg-gray-200"></div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900 leading-none">{BUSINESS_DATA.specialization}</span>
                                <span className="text-[11px] text-gray-500 mt-0.5">Trusted by hundreds of Samsung users</span>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
                            Professional electrical, plumbing, and appliance repair services in Karaikudi & Koviloor. Dedicated to excellence and customer satisfaction.
                            Trust <span className="font-bold text-gray-900">ARK TRUE COOL TECH</span> for quality service at your doorstep.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a
                                href={`tel:${BUSINESS_DATA.phones[0].value}`}
                                className="group flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                            >
                                <Phone className="group-hover:animate-bounce" />
                                Call Expert Now
                            </a>
                            <a
                                href={`https://wa.me/${BUSINESS_DATA.whatsappNumbers[0]}`}
                                className="flex items-center justify-center gap-3 bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:border-primary/20 hover:bg-blue-50 transition-all active:scale-95"
                            >
                                <MessageSquare className="text-green-500" />
                                WhatsApp Us
                            </a>
                        </div>

                        <div className="mt-10 flex items-center justify-center md:justify-start gap-6 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <ChevronRight className="text-primary" size={16} /> Certified Technicians
                            </div>
                            <div className="flex items-center gap-2">
                                <ChevronRight className="text-primary" size={16} /> Genuine Parts
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-primary to-blue-800 p-1 group/logo-container">
                            <div className="bg-white rounded-[2.4rem] overflow-hidden aspect-square flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-blue-50/50 group-hover/logo-container:bg-blue-100/50 transition-colors duration-500"></div>
                                <motion.div
                                    className="relative z-10 p-12"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, -2, 2, 0],
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <img
                                        src={BUSINESS_DATA.logo}
                                        alt={BUSINESS_DATA.name}
                                        className="w-full h-auto drop-shadow-2xl"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/400x400/0056b3/ffffff?text=ARK+TRUE+COOL+TECH"
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </div>
                        {/* Floating stats card */}
                        <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden lg:block">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                                    <span className="text-2xl font-bold">1k+</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-none">Happy Customers</p>
                                    <p className="text-xs text-gray-500 mt-1">In Karaikudi & Koviloor area</p>
                                </div>
                            </div>
                        </div>

                        {/* Experience floating card */}
                        <div className="absolute -top-6 -right-6 z-20 bg-primary p-6 rounded-3xl shadow-xl shadow-blue-500/30 hidden lg:block">
                            <div className="text-center">
                                <p className="text-3xl font-black text-white leading-none">{BUSINESS_DATA.experienceYears}+</p>
                                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mt-1">Years Experience</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
