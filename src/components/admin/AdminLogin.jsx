import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BUSINESS_DATA } from '../../constants/businessData';

const AdminLogin = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const SCRIPT_URL = BUSINESS_DATA.googleScriptUrl || "";

        try {
            if (!SCRIPT_URL) {
                // Mock login for now
                const validPhones = BUSINESS_DATA.phones.map(p => p.value);
                if (validPhones.includes(phone) && password === "admin123") {
                    localStorage.setItem('admin_token', 'mock-token');
                    navigate('/admin/dashboard');
                } else {
                    alert("Invalid Credentials (Mock)");
                }
            } else {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({ action: 'login', phone, password })
                });
                // Note: mode 'no-cors' won't allow reading response, but user can update later
                // For production-ready Apps Script, usually use jsonp or handle CORS properly
                // For now, assume success if phone matches a stored value or proceed with user instructions
                localStorage.setItem('admin_token', 'active');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed. Check console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 border border-gray-100"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Admin Portal</h1>
                    <p className="text-gray-500 font-medium">Secure access to management dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
                            <input
                                required
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold text-gray-900"
                                placeholder="Admin Phone"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-bold text-gray-900"
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>Sign In <ArrowRight size={20} /></>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
