import React from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { BUSINESS_DATA } from '../constants/businessData';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'About Us', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <img
                            src={BUSINESS_DATA.logo}
                            alt=""
                            className="h-10 w-auto"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-primary leading-none tracking-tighter">
                                ARK TRUE COOL TECH
                            </span>
                            <span className="text-[10px] font-medium text-gray-500 tracking-widest uppercase">
                                {BUSINESS_DATA.tagline}
                            </span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-primary font-medium transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href={`tel:${BUSINESS_DATA.phones[0].value}`}
                            className="bg-primary text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            <Phone size={18} />
                            Call Now
                        </a>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-primary p-2 transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-4 text-base font-semibold text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 grid grid-cols-2 gap-4">
                            <a
                                href={`tel:${BUSINESS_DATA.phones[0].value}`}
                                className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold"
                            >
                                <Phone size={18} /> Call
                            </a>
                            <a
                                href={`https://wa.me/${BUSINESS_DATA.whatsappNumbers[0]}`}
                                className="flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-xl font-bold"
                            >
                                <MessageSquare size={18} /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
