import React from 'react';
import { BUSINESS_DATA } from '../constants/businessData';

const Footer = () => {
    return (
        <footer className="bg-gray-50 pt-16 pb-32 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={BUSINESS_DATA.logo}
                        alt=""
                        className="h-16 w-auto mb-4 opacity-80"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                    <span className="text-2xl font-black text-primary leading-none tracking-tighter mb-2">
                        ARK TRUE COOL TECH
                    </span>
                    <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                        {BUSINESS_DATA.tagline}
                    </span>
                </div>

                <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                    Professional electrical, plumbing, and appliance repair services in Karaikudi & Koviloor. Dedicated to excellence and customer satisfaction.
                </p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
                    <a href="#home" className="text-gray-600 hover:text-primary font-bold text-sm">Home</a>
                    <a href="#services" className="text-gray-600 hover:text-primary font-bold text-sm">Services</a>
                    <a href="#about" className="text-gray-600 hover:text-primary font-bold text-sm">About Us</a>
                    <a href="#contact" className="text-gray-600 hover:text-primary font-bold text-sm">Contact</a>
                    <a href="/admin/login" className="text-gray-400 hover:text-primary font-medium text-sm">Admin</a>
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <p className="text-gray-400 text-xs">
                        © {new Date().getFullYear()} ARK TRUE COOL TECH. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
