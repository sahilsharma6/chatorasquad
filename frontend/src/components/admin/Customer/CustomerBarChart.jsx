// CustomerAreaChart.js
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

const CustomerAreaChart = ({ customers }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [customRange, setCustomRange] = useState(false);
    const [selectedRange, setSelectedRange] = useState('All');

    
    // Predefined date ranges
    const handlePredefinedRange = (range) => {
        const today = new Date();
        let startDate, endDate;

        switch (range) {
            case 'today':
                startDate = new Date(today.setHours(0, 0, 0, 0));
                endDate = new Date(today.setHours(23, 59, 59, 999));
                break;
            case 'thisWeek':
                const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
                startDate = new Date(weekStart.setHours(0, 0, 0, 0));
                endDate = new Date(today.setHours(23, 59, 59, 999));
                break;
            case 'thisMonth':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
                break;
            case 'thisYear':
                startDate = new Date(today.getFullYear(), 0, 1);
                endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
                break;
            default:
                break;
        }

        setDateRange([startDate, endDate]);
        setCustomRange(false);
    };

    // Filter customers based on date range
    const filteredCustomers = useMemo(() => {
        if (!dateRange[0] || !dateRange[1]) return customers;

        return customers.filter(customer => {
            const createdDate = new Date(customer.created);
            return createdDate >= dateRange[0] && createdDate <= dateRange[1];
        });
    }, [customers, dateRange]);

    // Prepare data for the area chart
    const data = useMemo(() => {
        const counts = {};
        filteredCustomers.forEach(customer => {
            const createdDate = new Date(customer.created);
            const dateKey = createdDate.toLocaleDateString(); // Group by date

            counts[dateKey] = (counts[dateKey] || 0) + 1;
        });

        return Object.entries(counts).map(([date, count]) => ({ date, count }));
    }, [filteredCustomers]);

    return (
        <div className="p-4 mt-8 shadow-xl mb-2 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Customer Growth Over Time</h2>
            <div className="flex mb-4 gap-2 flex-wrap">

            <button
                    onClick={() => {
                        handlePredefinedRange('All');
                        setSelectedRange('All');
                    }}
                    className={` delay-100 transition-all p-3 rounded-3xl ${selectedRange === 'All' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                    All
                </button>
                <button
                    onClick={() => {
                        handlePredefinedRange('today');
                        setSelectedRange('today');
                    }}
                    className={`transition-all delay-100 p-3 rounded-3xl ${selectedRange === 'today' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                    This Day
                </button>
                <button
                    onClick={() => {
                        handlePredefinedRange('thisWeek');
                        setSelectedRange('thisWeek');
                    }}
                    className={`transition-all delay-100 p-3 rounded-3xl ${selectedRange === 'thisWeek' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                    This Week
                </button>
                <button
                    onClick={() => {
                        handlePredefinedRange('thisMonth');
                        setSelectedRange('thisMonth');
                    }}
                    className={`transition-all delay-100 p-3 rounded-3xl ${selectedRange === 'thisMonth' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                    This Month
                </button>
                <button
                    onClick={() => {
                        handlePredefinedRange('thisYear');
                        setSelectedRange('thisYear');
                    }}
                    className={`transition-all delay-100 p-3 rounded-3xl ${selectedRange === 'thisYear' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                    This Year
                </button>
            </div>

            <div className="flex mb-4">
                <DatePicker
                    selectsRange
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={update => {
                        setDateRange(update);
                        setCustomRange(true);
                        setSelectedRange('');
                    }}
                    isClearable={true}
                    placeholderText="Select a custom date range"
                    className="border border-gray-300 rounded-lg p-2 py-4"
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#82ca9d" fillOpacity={0.3} fill="#82ca9d" />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

export default CustomerAreaChart;