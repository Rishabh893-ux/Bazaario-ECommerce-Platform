"use client";

import { useState, useEffect } from 'react';
import { Timer, Zap, Flame } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Extended mock product data matching ProductCard schema
const DEAL_PRODUCTS = [
  { 
    id: 101, 
    name: 'Sony WH-1000XM5 Wireless Headphones', 
    slug: 'sony-wh-1000xm5-wireless-headphones',
    originalPrice: 398.00, 
    price: 298.00, 
    stockCount: 15,
    ratingAvg: 4.9,
    ratingCount: 142,
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80'], 
    vendor: { storeName: 'ElectroHub' }, 
    category: 'Electronics', 
    stockTotal: 100, 
    stockSold: 85 
  },
  { 
    id: 102, 
    name: 'Vitamix Professional Series 750', 
    slug: 'vitamix-professional-series-750',
    originalPrice: 629.99, 
    price: 449.99, 
    stockCount: 38,
    ratingAvg: 4.8,
    ratingCount: 95,
    images: ['https://images.unsplash.com/photo-1585237832815-4fa81788c03e?w=500&q=80'], 
    vendor: { storeName: 'KitchenPro' }, 
    category: 'Home', 
    stockTotal: 50, 
    stockSold: 12 
  },
  { 
    id: 103, 
    name: 'Herman Miller Aeron Chair', 
    slug: 'herman-miller-aeron-chair',
    originalPrice: 1320.00, 
    price: 950.00, 
    stockCount: 3,
    ratingAvg: 5.0,
    ratingCount: 210,
    images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80'], 
    vendor: { storeName: 'Office Ergonomics' }, 
    category: 'Home', 
    stockTotal: 25, 
    stockSold: 22 
  },
  { 
    id: 104, 
    name: 'Dyson V15 Detect Vacuum', 
    slug: 'dyson-v15-detect-vacuum',
    originalPrice: 749.99, 
    price: 599.99, 
    stockCount: 50,
    ratingAvg: 4.7,
    ratingCount: 64,
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80'], 
    vendor: { storeName: 'KitchenPro' }, 
    category: 'Home', 
    stockTotal: 200, 
    stockSold: 150 
  },
  { 
    id: 105, 
    name: 'Nike Air Max 270 Sneakers', 
    slug: 'nike-air-max-270-sneakers',
    originalPrice: 160.00, 
    price: 109.99, 
    stockCount: 22,
    ratingAvg: 4.6,
    ratingCount: 312,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'], 
    vendor: { storeName: 'SoleStyle' }, 
    category: 'Fashion', 
    stockTotal: 80, 
    stockSold: 58 
  },
  { 
    id: 106, 
    name: 'LEGO Technic Supercar Set', 
    slug: 'lego-technic-supercar-set',
    originalPrice: 229.99, 
    price: 159.99, 
    stockCount: 11,
    ratingAvg: 4.9,
    ratingCount: 87,
    images: ['https://images.unsplash.com/photo-1618842676088-c4d48a6a7571?w=500&q=80'], 
    vendor: { storeName: 'ToyWorld' }, 
    category: 'Toys', 
    stockTotal: 40, 
    stockSold: 29 
  },
];

const DEAL_SALE_DURATION_HOURS = 24;

function getOrInitEndTime() {
  if (typeof window === "undefined") return Date.now() + DEAL_SALE_DURATION_HOURS * 3600 * 1000;
  const stored = localStorage.getItem("vendly_deal_end");
  if (stored && Number(stored) > Date.now()) return Number(stored);
  const end = Date.now() + DEAL_SALE_DURATION_HOURS * 3600 * 1000;
  localStorage.setItem("vendly_deal_end", String(end));
  return end;
}

function getTimeLeft(endTime) {
  const diff = Math.max(0, endTime - Date.now());
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { hours, minutes, seconds };
}

const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Toys"];

export default function DealsPage() {
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const end = getOrInitEndTime();
    setEndTime(end);
    setTimeLeft(getTimeLeft(end));
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(end));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = activeCategory === "All"
    ? DEAL_PRODUCTS
    : DEAL_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Navbar />
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

        {/* Category Filter Bar */}
        <div className="border-b border-brand-light/30 bg-background/80 backdrop-blur-md sticky top-[68px] z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-ink text-white shadow-sm scale-105"
                    : "bg-card border border-brand-light/70 text-ink/70 hover:border-brand/30 hover:bg-card"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-10 border-b border-brand-light/30 pb-6">
            <Flame size={28} className="text-accent fill-accent" />
            <h2 className="text-3xl font-black text-ink">Trending Now</h2>
            <span className="ml-auto text-sm font-bold text-ink/40">{filteredProducts.length} deals</span>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-brand-light/60 shadow-sm flex flex-col items-center animate-fade-up">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-ink mb-2">No deals in this category right now</h3>
              <p className="text-ink/60 mb-6">Check back soon or browse all deals.</p>
              <button onClick={() => setActiveCategory("All")} className="px-6 py-2.5 rounded-full bg-ink text-white font-bold hover:bg-brand-dark transition-colors shadow-sm">
                View All Deals
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                const percentClaimed = Math.round((product.stockSold / product.stockTotal) * 100);
                const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                
                return (
                  <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
                    <div className="relative mb-0">
                      <div className="absolute top-4 left-4 z-20 bg-accent text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                        {discount}% OFF
                      </div>
                      <ProductCard product={product} />
                    </div>
                    
                    {/* Deal specific UI beneath standard product card */}
                    <div className="bg-card border border-brand-light/50 border-t-0 p-4 rounded-b-2xl -mt-4 pt-6 relative z-10 shadow-sm">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-ink/60">{percentClaimed}% Claimed</span>
                        <span className="text-accent line-through text-ink/40 mr-1">${product.originalPrice.toFixed(2)}</span>
                      </div>
                      <div className="w-full h-2 bg-brand-light/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-accent-light to-accent rounded-full transition-all duration-1000"
                          style={{ width: `${percentClaimed}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-ink/40 font-semibold mt-2 text-right">{product.stockTotal - product.stockSold} units left</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
