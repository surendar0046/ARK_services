import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { BUSINESS_DATA } from '../constants/businessData';
import BookingForm from './BookingForm';

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <section id="services" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-3">Our Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900">Professional Services</h3>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BUSINESS_DATA.services.map((service, index) => {
                        const IconComponent = Icons[service.icon];
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full"
                            >
                                <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    {IconComponent && <IconComponent size={32} />}
                                </div>

                                <h4 className="text-2xl font-black text-gray-900 mb-4">{service.title}</h4>
                                <p className="text-gray-600 mb-8 flex-grow">
                                    {service.description}
                                </p>

                                <div className="grid grid-cols-1 gap-3 mt-auto">
                                    <button
                                        onClick={() => setSelectedService(service.id)}
                                        className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/10"
                                    >
                                        <Icons.Calendar size={20} /> Book Service Call
                                    </button>
                                    <div className="grid grid-cols-2 gap-3">
                                        <a
                                            href={`tel:${BUSINESS_DATA.phones[0].value}`}
                                            className="flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-100 py-3 rounded-xl font-bold text-sm hover:border-primary/20 hover:bg-blue-50 transition-all"
                                        >
                                            <Icons.Phone size={16} /> Call
                                        </a>
                                        <a
                                            href={`https://wa.me/${BUSINESS_DATA.whatsappNumbers[0]}`}
                                            className="flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-100 py-3 rounded-xl font-bold text-sm hover:border-primary/20 hover:bg-blue-50 transition-all"
                                        >
                                            <Icons.MessageSquare size={16} className="text-green-500" /> WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {selectedService && (
                <BookingForm
                    serviceId={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </section>
    );
};

export default Services;
