import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="middle"
        className="text-sm font-semibold"
      >
        {value}
      </text>
    );
};

const getDistinctOrderData = (data) => {
    const uniqueData = {};
    data.forEach(item => {
        if (!uniqueData[item.name]) {
            uniqueData[item.name] = { ...item };
        } else {
            uniqueData[item.name].value += item.value; // Sum the values for duplicates
        }
    });
    return Object.values(uniqueData);
};

export default function Piechart({ filteredOrderData }) {
    const distinctOrderData = getDistinctOrderData(filteredOrderData);

    return (
        <div className="flex">
            <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={distinctOrderData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                            label={CustomPieLabel}
                        >
                            {distinctOrderData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="w-1/2 flex flex-col justify-center space-y-2">
                {distinctOrderData.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-sm text-gray-600">{entry.name} ({entry.value})</span>
                    </div>
                ))}
            </div>
        </div>
    );
}