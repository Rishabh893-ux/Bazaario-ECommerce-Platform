"use client";

import { useTheme } from "next-themes";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueChart({ data }) {
  const { theme } = useTheme();
  
  if (!data || data.length === 0) return null;

  const isDark = theme === "dark";
  const strokeColor = "#0D9488"; // brand
  const gridColor = isDark ? "#334155" : "#E2E8F0"; // slate-700 / slate-200
  const textColor = isDark ? "#94A3B8" : "#64748B"; // slate-400 / slate-500
  
  return (
    <div className="bg-card dark:bg-slate-800 p-6 rounded-2xl border border-brand-light dark:border-slate-700 shadow-sm mb-10">
      <h2 className="text-xl font-bold text-ink dark:text-white mb-6">Revenue Overview (Last 30 Days)</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor, fontSize: 12 }} 
              tickFormatter={(str) => {
                const date = new Date(str);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor, fontSize: 12 }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: isDark ? "#1E293B" : "#fff", borderColor: gridColor, borderRadius: '8px', color: isDark ? "#fff" : "#0F172A" }}
              formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area type="monotone" dataKey="revenue" stroke={strokeColor} strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
