import React from 'react';
import { ShieldCheck, Clock, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { BUSINESS_DATA } from '../constants/businessData';

const About = () => {
    const highlights = [
        {
            icon: <ShieldCheck className="text-primary" />,
            title: "Trusted Service",
            desc: "Years of experience serving the Karaikudi & Koviloor community with reliability and integrity."
        },
        {
            icon: <Clock className="text-primary" />,
            title: "Quick Response",
            desc: "We value your time. Our technicians arrive promptly to solve your issues."
        },
        {
            icon: <Award className="text-primary" />,
            title: "Quality Work",
            desc: "We use genuine parts and follow industry standards for every repair job."
        }
    ];

    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                            <div className="absolute top-0 -right-4 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                            <div className="relative z-10 bg-gray-50 rounded-[3rem] p-12 lg:p-16 border border-gray-100 shadow-2xl">
                                <h3 className="text-primary font-black text-6xl mb-4 italic opacity-20 leading-none">ARK</h3>
                                <h4 className="text-3xl font-black text-gray-900 mb-6">Expert Service with {BUSINESS_DATA.experienceYears} Years of Legacy</h4>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    At <span className="font-bold text-primary">ARK TRUE COOL TECH</span>, we bring over <span className="font-bold text-gray-900">{BUSINESS_DATA.experienceYears} years of field-proven expertise</span> to your doorstep.
                                    We are proud to be a <span className="text-primary font-bold">{BUSINESS_DATA.specialization}</span>, offering specialized repair and maintenance for high-end appliances.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Our journey of a decade and a half has made us the most trusted name in Karaikudi & Koviloor. We don't just fix appliances; we provide peace of mind with our
                                    comprehensive electrical and plumbing expertise.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex-1 space-y-8">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex items-start gap-6 p-6 rounded-3xl hover:bg-blue-50 transition-colors group"
                            >
                                <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <div>
                                    <h5 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h5>
                                    <p className="text-gray-500">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
