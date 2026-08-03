"use client";

import { useState, useEffect } from 'react';
import { Timer, Zap, Flame } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';

// Extended mock product data with deal specific fields
const DEAL_PRODUCTS = [
  { id: 101, title: 'Sony WH-1000XM5 Wireless Headphones', originalPrice: 398.00, price: 298.00, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80', vendorId: 'v1', vendorName: 'ElectroHub', category: 'Electronics', stockTotal: 100, stockSold: 85 },
  { id: 102, title: 'Vitamix Professional Series 750', originalPrice: 629.99, price: 449.99, image: 'https://images.unsplash.com/photo-1585237832815-4fa81788c03e?w=500&q=80', vendorId: 'v2', vendorName: 'KitchenPro', category: 'Home', stockTotal: 50, stockSold: 12 },
  { id: 103, title: 'Herman Miller Aeron Chair', originalPrice: 1320.00, price: 950.00, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80', vendorId: 'v3', vendorName: 'Office Ergonomics', category: 'Furniture', stockTotal: 25, stockSold: 22 },
  { id: 104, title: 'Dyson V15 Detect Vacuum', originalPrice: 749.99, price: 599.99, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80', vendorId: 'v2', vendorName: 'KitchenPro', category: 'Home', stockTotal: 200, stockSold: 150 },
];

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 20 });

  // Fake countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      {/* Deals Hero */}
      <div className="bg-brand py-16 px-6 relative overflow-hidden border-b border-brand-light/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-center md:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-bold text-sm mb-6 border border-accent/30">
              <Zap size={16} className="fill-accent" />
              Flash Sale Event
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
              Lightning <span className="text-accent">Deals.</span>
            </h1>
            <p className="text-white/60 text-lg max-w-md font-medium">
              Massive discounts on premium products from top independent vendors.
            </p>
          </div>

          <div className="bg-card/10 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[2rem] text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <Timer size={16} /> Deals End In
            </p>
            <div className="flex gap-4 items-end justify-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-inner mb-2">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-white/50 text-xs font-bold uppercase">Hours</span>
              </div>
              <div className="text-3xl font-black text-white/30 pb-6">:</div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-inner mb-2">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-white/50 text-xs font-bold uppercase">Mins</span>
              </div>
              <div className="text-3xl font-black text-white/30 pb-6">:</div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-accent/20 border border-accent/30 rounded-2xl flex items-center justify-center text-3xl font-black text-accent shadow-inner mb-2">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-accent/60 text-xs font-bold uppercase">Secs</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-10 border-b border-brand-light/30 pb-6">
          <Flame size={28} className="text-accent fill-accent" />
          <h2 className="text-3xl font-black text-ink">Trending Now</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DEAL_PRODUCTS.map((product, index) => {
            const percentClaimed = Math.round((product.stockSold / product.stockTotal) * 100);
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            
            return (
              <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative mb-4">
                  <div className="absolute top-4 left-4 z-20 bg-accent text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                    {discount}% OFF
                  </div>
                  <ProductCard product={product} />
                </div>
                
                {/* Deal specific UI beneath standard product card */}
                <div className="bg-card border border-brand-light/50 p-4 rounded-2xl -mt-6 relative z-10 shadow-sm">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-ink/60">{percentClaimed}% Claimed</span>
                    <span className="text-accent">Hurry!</span>
                  </div>
                  <div className="w-full h-2 bg-brand-light/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent-light to-accent rounded-full transition-all duration-1000"
                      style={{ width: `${percentClaimed}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
