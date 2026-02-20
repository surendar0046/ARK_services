import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Calendar, Filter, PieChart as PieIcon, BarChart3, TrendingUp, Users, Package } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const AdminAnalytics = ({ bookings }) => {
    const [dateFilter, setDateFilter] = useState('30'); // Days
    const [serviceFilter, setServiceFilter] = useState('All');

    const filteredData = useMemo(() => {
        let result = bookings;

        // Date filter
        const now = new Date();
        if (dateFilter !== 'All') {
            const days = parseInt(dateFilter);
            const cutoff = new Date(now.setDate(now.getDate() - days));
            result = result.filter(b => new Date(b.createdAt) >= cutoff);
        }

        // Service filter
        if (serviceFilter !== 'All') {
            result = result.filter(b => b.service === serviceFilter);
        }

        return result;
    }, [bookings, dateFilter, serviceFilter]);

    const serviceStats = useMemo(() => {
        const stats = {};
        filteredData.forEach(b => {
            stats[b.service] = (stats[b.service] || 0) + 1;
        });
        return Object.entries(stats).map(([name, value]) => ({ name, value }));
    }, [filteredData]);

    const trendData = useMemo(() => {
        const stats = {};
        filteredData.forEach(b => {
            const date = new Date(b.createdAt).toLocaleDateString();
            stats[date] = (stats[date] || 0) + 1;
        });
        return Object.entries(stats)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(-10); // Last 10 days with data
    }, [filteredData]);

    const stats = {
        total: filteredData.length,
        completed: filteredData.filter(b => b.status === 'Completed' || b.status === 'Closed').length,
        pending: filteredData.filter(b => b.status === 'Pending' || b.status === 'Open').length
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Volume" value={stats.total} icon={<Users className="text-blue-500" />} />
                <StatCard title="Completion Rate" value={`${stats.total ? Math.round((stats.completed / stats.total) * 100) : 0}%`} icon={<TrendingUp className="text-green-500" />} />
                <StatCard title="Active Requests" value={stats.pending} icon={<BarChart3 className="text-orange-500" />} />
                <StatCard title="Growth" value="+12%" icon={<TrendingUp className="text-purple-500" />} subtitle="vs last period" />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                    <Filter size={16} /> Filters:
                </div>
                <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold outline-none border-none focus:ring-2 focus:ring-primary/20"
                >
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last 90 Days</option>
                    <option value="All">All Time</option>
                </select>
                <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold outline-none border-none focus:ring-2 focus:ring-primary/20"
                >
                    <option value="All">All Services</option>
                    {[...new Set(bookings.map(b => b.service))].map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Trends Chart */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-gray-900">Booking Trends</h3>
                            <p className="text-gray-400 text-sm font-bold">Daily service requests</p>
                        </div>
                        <Calendar className="text-gray-300" />
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 'bold', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 'bold', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-gray-900">Service Distribution</h3>
                            <p className="text-gray-400 text-sm font-bold">Popularity by category</p>
                        </div>
                        <PieIcon className="text-gray-300" />
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={serviceStats}
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {serviceStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.COLORS?.length || index % 6]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, subtitle }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-2xl">
                {icon}
            </div>
            {subtitle && <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest bg-gray-50 px-2 py-1 rounded-lg">{subtitle}</span>}
        </div>
        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-1">{title}</p>
        <h2 className="text-3xl font-black text-gray-900">{value}</h2>
    </div>
);

export default AdminAnalytics;
