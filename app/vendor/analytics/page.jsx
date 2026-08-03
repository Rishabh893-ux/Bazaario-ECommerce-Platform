"use client";

import { useState } from 'react';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight, 
  PieChart as PieIcon, BarChart3, Calendar, Filter, Download 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const SALES_DATA = [
  { month: 'Jan', revenue: 4200, orders: 84 },
  { month: 'Feb', revenue: 5800, orders: 112 },
  { month: 'Mar', revenue: 7400, orders: 140 },
  { month: 'Apr', revenue: 6900, orders: 130 },
  { month: 'May', revenue: 9200, orders: 185 },
  { month: 'Jun', revenue: 11500, orders: 230 },
  { month: 'Jul', revenue: 14200, orders: 280 },
];

const CATEGORY_DATA = [
  { name: 'Leather Goods', value: 45, color: '#DC2626' },
  { name: 'Accessories', value: 30, color: '#18181B' },
  { name: 'Apparel', value: 15, color: '#71717A' },
  { name: 'Footwear', value: 10, color: '#E4E4E7' },
];

const TOP_PRODUCTS = [
  { name: 'Classic Leather Briefcase', sales: 142, revenue: '$42,598', growth: '+18%' },
  { name: 'Weekender Duffle Bag', sales: 98, revenue: '$34,251', growth: '+24%' },
  { name: 'Minimalist Cardholder', sales: 310, revenue: '$13,950', growth: '+12%' },
];

export default function VendorAnalytics() {
  const [timeRange, setTimeRange] = useState('7m');

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      {/* Header */}
      <div className="bg-brand py-12 px-6 border-b border-brand-light/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Seller Analytics</span>
            <h1 className="text-3xl md:text-4xl font-black text-white mt-1">Performance & Sales Insights</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 flex border border-white/10 text-xs font-bold text-white">
              {['30d', '7m', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg transition-all ${timeRange === range ? 'bg-accent text-white shadow' : 'hover:bg-white/10 text-white/70'}`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="px-5 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg">
              <Download size={14} /> Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 space-y-10">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-brand-light/50 p-6 rounded-[2rem] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-ink/40 uppercase tracking-widest">Total Revenue</span>
              <div className="p-3 bg-accent/10 text-accent rounded-xl"><DollarSign size={20} /></div>
            </div>
            <h3 className="text-3xl font-black text-ink mb-2">$59,200</h3>
            <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
              <ArrowUpRight size={14} /> +23.5% vs last period
            </span>
          </div>

          <div className="bg-card border border-brand-light/50 p-6 rounded-[2rem] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-ink/40 uppercase tracking-widest">Total Orders</span>
              <div className="p-3 bg-brand/10 text-brand dark:bg-white/10 dark:text-white rounded-xl"><ShoppingBag size={20} /></div>
            </div>
            <h3 className="text-3xl font-black text-ink mb-2">1,171</h3>
            <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
              <ArrowUpRight size={14} /> +14.2% vs last period
            </span>
          </div>

          <div className="bg-card border border-brand-light/50 p-6 rounded-[2rem] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-ink/40 uppercase tracking-widest">Conversion Rate</span>
              <div className="p-3 bg-accent/10 text-accent rounded-xl"><TrendingUp size={20} /></div>
            </div>
            <h3 className="text-3xl font-black text-ink mb-2">3.84%</h3>
            <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
              <ArrowUpRight size={14} /> +0.6% vs last period
            </span>
          </div>

          <div className="bg-card border border-brand-light/50 p-6 rounded-[2rem] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-ink/40 uppercase tracking-widest">Avg. Order Value</span>
              <div className="p-3 bg-brand/10 text-brand dark:bg-white/10 dark:text-white rounded-xl"><Users size={20} /></div>
            </div>
            <h3 className="text-3xl font-black text-ink mb-2">$50.55</h3>
            <span className="text-red-500 text-xs font-bold flex items-center gap-1">
              <ArrowDownRight size={14} /> -1.2% vs last period
            </span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Revenue Growth Area Chart */}
          <div className="lg:col-span-2 bg-card border border-brand-light/50 p-8 rounded-[2rem] shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-black text-ink">Revenue Overview</h3>
                <p className="text-xs font-semibold text-ink/40">Monthly sales performance trajectory</p>
              </div>
              <BarChart3 className="text-accent" size={20} />
            </div>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} tickLine={false} />
                  <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181B', borderRadius: '1rem', color: '#FFF', border: 'none' }}
                    itemStyle={{ color: '#DC2626' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#DC2626" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Category Pie */}
          <div className="bg-card border border-brand-light/50 p-8 rounded-[2rem] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-ink">Category Share</h3>
                <PieIcon className="text-accent" size={20} />
              </div>
              
              <div className="h-48 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={CATEGORY_DATA} innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                      {CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-brand-light/40">
              {CATEGORY_DATA.map((cat) => (
                <div key={cat.name} className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-ink/70">{cat.name}</span>
                  </div>
                  <span className="text-ink">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Top Products Table */}
        <div className="bg-card border border-brand-light/50 p-8 rounded-[2rem] shadow-xl">
          <h3 className="text-xl font-black text-ink mb-6">Top Performing Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-light/50 text-xs font-bold text-ink/40 uppercase tracking-widest">
                  <th className="pb-4">Product Name</th>
                  <th className="pb-4">Units Sold</th>
                  <th className="pb-4">Total Revenue</th>
                  <th className="pb-4">Growth Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-light/40 text-sm font-semibold text-ink">
                {TOP_PRODUCTS.map((prod, i) => (
                  <tr key={i} className="hover:bg-brand-light/20 transition-colors">
                    <td className="py-4 font-bold">{prod.name}</td>
                    <td className="py-4 text-ink/70">{prod.sales}</td>
                    <td className="py-4 font-black">{prod.revenue}</td>
                    <td className="py-4 text-emerald-600 font-bold">{prod.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
