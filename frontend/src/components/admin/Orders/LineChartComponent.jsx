import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const LineChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="rgb(249 115 22)" />
        <Tooltip 
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div className="custom-tooltip">
                  <p className="text-orange-500">{`Date: ${payload[0].payload.date}`}</p>
                  <p className="text-orange-500">{`Orders: ${payload[0].payload.orders}`}</p>
                  <p  className="text-orange-500">{`Revenue: ₹${payload[1].payload.revenue}`}</p>
                </div>
              );
            }
            return null;
          }} 
        />
        <Line 
          type="monotone" 
          dataKey="orders" 
          stroke="rgb(249 115 22)" 
          yAxisId="left" 
          activeDot={{ r: 8 }} 
          strokeWidth={3}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="yellow" 
          yAxisId="right" 
          activeDot={{ r: 8 }} 
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;