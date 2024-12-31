import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

const RatingChart = ({ reviews }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [filter, setFilter] = useState('today');

    useEffect(() => {
        const today = new Date();
        console.log(today);
        
        switch (filter) {
            case 'today':
                setStartDate(today);
                setEndDate(today);
                break;
            case 'week':
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - today.getDay());
                setStartDate(weekStart);
                setEndDate(today);
                break;
            case 'month':
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                setStartDate(monthStart);
                setEndDate(today);
                break;
            case 'year':
                const yearStart = new Date(today.getFullYear(), 0, 1);
                setStartDate(yearStart);
                setEndDate(today);
                break;
            default:
                break;
        }
    }, [filter]);

    const filteredData = reviews.filter(review => {
        const reviewDate = new Date(review.date);
        return reviewDate >= startDate && reviewDate <= endDate;
    });

    const chartData = filteredData.map(review => ({
        date: review.date,
        rating: review.reviewer.rating,
    }));

    console.log('Chart Data:', chartData); // Debugging purpose

    return (
        <div className="p-4 mt-8 shadow-lg">
            <h2 className="text-xl font-bold mb-6 mt-6">Rating Growth</h2>
            <div className="flex space-x-4 mb-4 flex-wrap gap-4 justify-center">
                <button
                    onClick={() => setFilter('today')}
                    className={`px-4 py-2 rounded-full ${filter === 'today' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                    This Day
                </button>
                <button
                    onClick={() => setFilter('week')}
                    className={`px-4 py-2 rounded-full ${filter === 'week' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                    This Week
                </button>
                <button
                    onClick={() => setFilter('month')}
                    className={`px-4 py-2 rounded-full ${filter === 'month' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                    This Month
                </button>
                <button
                    onClick={() => setFilter('year')}
                    className={`px-4 py-2 rounded-full ${filter === 'year' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                    This Year
                </button>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="border p-2 py-4 rounded"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="border p-2 py-4 rounded"
                />
            </div>

            {chartData.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <ResponsiveContainer width={'100%'} height={400}>
                    <AreaChart  data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="rating"
                            stroke="orange"
                            strokeWidth={2}
                            fillOpacity={0.5}
                            fill="url(#colorGradient)"
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="yellow" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="orange" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                    </AreaChart>
                    </ResponsiveContainer>
                </motion.div>
            ) : (
                <p>No data available for the selected period.</p>
            )}
        </div>
    );
};

export default RatingChart;
