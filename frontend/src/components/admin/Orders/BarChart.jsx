
import { Bar,BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function OrderBarChart({filteredData}){
    return (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="rgb(249 165 22)" />
                </BarChart>
              </ResponsiveContainer>
    )
}