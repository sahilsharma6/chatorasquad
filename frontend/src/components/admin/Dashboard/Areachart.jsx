import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ({filteredData}){
    return(
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={filteredData}>
                          <defs>
                            <linearGradient id="netProfitGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" interval={1}/>
                          <YAxis />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="netProfit" 
                            stroke="#3B82F6" 
                            fill="url(#netProfitGradient)" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#EC4899" 
                            fill="url(#revenueGradient)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
    )
}