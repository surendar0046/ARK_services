import React, { useState, useEffect } from 'react';
import {
    Search, Download, CheckCircle, Clock,
    MoreVertical, LogOut, Package, Phone,
    User, MapPin, Calendar, Filter, Trash2,
    LayoutDashboard, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BUSINESS_DATA } from '../../constants/businessData';
import AdminAnalytics from './AdminAnalytics';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'analytics'
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [serviceFilter, setServiceFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = "/api/bookings";

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if (Array.isArray(data)) {
                const mappedData = data.map(b => ({
                    ...b,
                    id: b.bookingId
                }));
                setBookings(mappedData);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus, note = "") => {
        try {
            const body = { status: newStatus };
            if (note) body.adminNotes = note;

            const response = await fetch(`${API_URL}/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (response.ok) fetchBookings();
        } catch (error) {
            console.error("Status update error:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) fetchBookings();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const handleExport = () => {
        const dataToExport = filteredBookings.map(({ _id, __v, createdAt, updatedAt, ...rest }) => rest);
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Bookings");
        XLSX.writeFile(wb, `ARK_Bookings_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Add Header
        doc.setFontSize(22);
        doc.setTextColor(59, 130, 246); // primary color
        doc.text("ARK TRUE COOL TECH", 14, 22);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Bookings Report - Generated: ${new Date().toLocaleString()}`, 14, 30);

        // Prepare Table Data
        const tableBody = filteredBookings.map(b => [
            b.name,
            b.phone,
            b.service,
            b.date,
            b.status === 'Open' ? 'Pending' : (b.status === 'Closed' ? 'Completed' : b.status)
        ]);

        autoTable(doc, {
            startY: 40,
            head: [['Customer', 'Phone', 'Service', 'Preferred Date', 'Status']],
            body: tableBody,
            headStyles: { fillColor: [59, 130, 246], fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [249, 250, 251] },
            margin: { top: 40 }
        });

        doc.save(`ARK_Bookings_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const filteredBookings = bookings.filter(b => {
        const matchesSearch = (b.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
            (b.phone || '').includes(searchTerm || '');

        // Normalize status for filtering
        const normalizedStatus = b.status === 'Open' ? 'Pending' : (b.status === 'Closed' ? 'Completed' : b.status);
        const matchesStatus = statusFilter === 'All' || normalizedStatus === statusFilter;

        const matchesService = serviceFilter === 'All' || b.service === serviceFilter;
        return matchesSearch && matchesStatus && matchesService;
    });

    const logout = () => {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 flex items-center justify-between px-8 py-6 sticky top-0 z-30">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                            <Package size={24} />
                        </div>
                        <h1 className="text-2xl font-black text-gray-900 leading-none">Admin Panel</h1>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="hidden md:flex items-center bg-gray-50 p-1 rounded-2xl border border-gray-100">
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black transition-all ${activeTab === 'bookings'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <LayoutDashboard size={18} /> Bookings
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black transition-all ${activeTab === 'analytics'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <BarChart3 size={18} /> Analytics
                        </button>
                    </nav>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors font-bold"
                >
                    <LogOut size={20} /> Logout
                </button>
            </header>

            <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
                {activeTab === 'analytics' ? (
                    <AdminAnalytics bookings={bookings} />
                ) : (
                    <>
                        {/* Stats & Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                                <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-2">Total Bookings</p>
                                <h2 className="text-4xl font-black text-gray-900">{bookings?.length || 0}</h2>
                            </div>
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                                <p className="text-green-500 font-black uppercase tracking-widest text-xs mb-2">Completed Calls</p>
                                <h2 className="text-4xl font-black text-gray-900">
                                    {bookings?.filter(b => b.status === 'Completed' || b.status === 'Closed').length || 0}
                                </h2>
                            </div>
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-end justify-between">
                                <div>
                                    <p className="text-blue-500 font-black uppercase tracking-widest text-xs mb-2">Pending Calls</p>
                                    <h2 className="text-4xl font-black text-gray-900">
                                        {bookings?.filter(b => b.status === 'Pending' || b.status === 'Open').length || 0}
                                    </h2>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleExport}
                                        className="bg-primary text-white p-4 rounded-2xl flex items-center gap-2 font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                                        title="Export Excel"
                                    >
                                        <Download size={20} /> Excel
                                    </button>
                                    <button
                                        onClick={handleExportPDF}
                                        className="bg-red-500 text-white p-4 rounded-2xl flex items-center gap-2 font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                                        title="Export PDF"
                                    >
                                        <Download size={20} /> PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-grow w-full relative">
                                <Search className="absolute left-4 top-4 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-50 p-4 pl-12 rounded-2xl outline-none font-bold text-gray-900 focus:bg-white border-2 border-transparent focus:border-primary/10 transition-all"
                                />
                            </div>
                            <div className="w-full md:w-64 relative">
                                <Package className="absolute left-4 top-4 text-gray-400" size={20} />
                                <select
                                    value={serviceFilter}
                                    onChange={(e) => setServiceFilter(e.target.value)}
                                    className="w-full bg-gray-50 p-4 pl-12 rounded-2xl outline-none font-bold text-gray-900 appearance-none focus:bg-white border-2 border-transparent focus:border-primary/10 transition-all"
                                >
                                    <option value="All">All Services</option>
                                    {BUSINESS_DATA.services.map(s => (
                                        <option key={s.id} value={s.title}>{s.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full md:w-64 relative">
                                <Filter className="absolute left-4 top-4 text-gray-400" size={20} />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full bg-gray-50 p-4 pl-12 rounded-2xl outline-none font-bold text-gray-900 appearance-none focus:bg-white border-2 border-transparent focus:border-primary/10 transition-all"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-xs">Customer</th>
                                            <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-xs">Service & Address</th>
                                            <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-xs">Preferred Date</th>
                                            <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-xs">Status</th>
                                            <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-xs">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {filteredBookings.map((booking, idx) => (
                                                <motion.tr
                                                    key={booking.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                                >
                                                    <td className="p-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center font-black">
                                                                {booking.name?.charAt(0) || 'U'}
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-gray-900">{booking.name}</p>
                                                                <p className="text-gray-500 text-sm font-medium">{booking.phone}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-1.5 text-primary text-sm font-black">
                                                                <Package size={14} /> {booking.service}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                                                                <MapPin size={14} /> {booking.address}
                                                            </div>
                                                            {booking.adminNotes ? (
                                                                <div className="mt-2 p-3 bg-blue-50/50 rounded-xl text-xs font-bold text-blue-700 border border-blue-100/50 relative group">
                                                                    <div className="flex justify-between items-start mb-1">
                                                                        <span className="uppercase tracking-widest text-[10px] opacity-50">Admin Note</span>
                                                                    </div>
                                                                    {booking.adminNotes}
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        const note = prompt("Add a note for this booking:");
                                                                        if (note) handleUpdateStatus(booking.id, booking.status, note);
                                                                    }}
                                                                    className="mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                                                                >
                                                                    + Add Note
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-6 text-gray-900 font-bold">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={16} className="text-gray-400" />
                                                            {booking.date}
                                                        </div>
                                                    </td>
                                                    <td className="p-6">
                                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${booking.status === 'Pending' || booking.status === 'Open' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                                            }`}>
                                                            {booking.status === 'Open' ? 'Pending' : (booking.status === 'Closed' ? 'Completed' : booking.status)}
                                                        </span>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="flex flex-col gap-2">
                                                            {(booking.status === 'Pending' || booking.status === 'Open') ? (
                                                                <button
                                                                    onClick={() => handleUpdateStatus(booking.id, 'Completed')}
                                                                    className="flex items-center gap-1.5 text-green-600 hover:text-green-700 font-black text-sm transition-colors"
                                                                >
                                                                    <CheckCircle size={18} /> Mark Completed
                                                                </button>
                                                            ) : (
                                                                <span className="text-gray-400 text-sm font-bold flex items-center gap-1.5">
                                                                    <Clock size={18} /> Completed
                                                                </span>
                                                            )}
                                                            <button
                                                                onClick={() => handleDelete(booking.id)}
                                                                className="flex items-center gap-1.5 text-red-400 hover:text-red-600 font-black text-xs transition-colors"
                                                            >
                                                                <Trash2 size={16} /> Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
