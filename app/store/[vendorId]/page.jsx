"use client";

import { useState } from 'react';
import { Star, MapPin, Calendar, ShieldCheck, Mail, Share2 } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';

// Mock data for the storefront
const STORE_DATA = {
  name: "Artisan Leather Co.",
  description: "Handcrafted, ethically sourced leather goods for the modern traveler. We believe in quality that lasts a lifetime.",
  rating: 4.9,
  reviewsCount: 1284,
  location: "Portland, OR",
  joinedDate: "October 2021",
  bannerImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=2000",
  logoImage: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=200&h=200",
};

const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: 'Classic Leather Briefcase', 
    slug: 'classic-leather-briefcase',
    price: 299.99, 
    stockCount: 12,
    ratingAvg: 4.8,
    ratingCount: 42,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80'], 
    vendor: { storeName: 'Artisan Leather Co.' }, 
    category: 'Bags' 
  },
  { 
    id: 2, 
    name: 'Minimalist Cardholder', 
    slug: 'minimalist-cardholder',
    price: 45.00, 
    stockCount: 25,
    ratingAvg: 5.0,
    ratingCount: 18,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80'], 
    vendor: { storeName: 'Artisan Leather Co.' }, 
    category: 'Accessories' 
  },
  { 
    id: 3, 
    name: 'Weekender Duffle', 
    slug: 'weekender-duffle',
    price: 349.50, 
    stockCount: 4,
    ratingAvg: 4.9,
    ratingCount: 89,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80'], 
    vendor: { storeName: 'Artisan Leather Co.' }, 
    category: 'Bags' 
  },
  { 
    id: 4, 
    name: 'Hand-stitched Belt', 
    slug: 'hand-stitched-belt',
    price: 85.00, 
    stockCount: 15,
    ratingAvg: 4.7,
    ratingCount: 24,
    images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&q=80'], 
    vendor: { storeName: 'Artisan Leather Co.' }, 
    category: 'Accessories' 
  },
];

export default function VendorStorefront() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      {/* Store Banner */}
      <div className="w-full h-[300px] md:h-[400px] relative">
        <img 
          src={STORE_DATA.bannerImage} 
          alt={`${STORE_DATA.name} banner`} 
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative -mt-32">
        {/* Store Profile Card */}
        <div className="bg-card rounded-[2rem] p-8 shadow-xl border border-brand-light/30 flex flex-col md:flex-row gap-8 items-center md:items-start animate-fade-up">
          {/* Logo */}
          <div className="w-40 h-40 rounded-full border-4 border-background overflow-hidden shadow-lg shrink-0 -mt-16 md:-mt-20">
            <img 
              src={STORE_DATA.logoImage} 
              alt={STORE_DATA.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-ink flex items-center justify-center md:justify-start gap-3">
                  {STORE_DATA.name}
                  <ShieldCheck className="text-accent" size={24} />
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-ink/70 font-medium">
                  <Star className="fill-accent text-accent" size={16} />
                  <span className="text-ink font-bold">{STORE_DATA.rating}</span>
                  <span>({STORE_DATA.reviewsCount} reviews)</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="p-3 rounded-full bg-brand-light/30 text-ink hover:bg-brand hover:text-white transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-bold transition-colors shadow-lg">
                  Follow Store
                </button>
              </div>
            </div>

            <p className="text-ink/80 text-lg leading-relaxed mb-6 max-w-3xl">
              {STORE_DATA.description}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-semibold text-ink/60">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                {STORE_DATA.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-accent" />
                Joined {STORE_DATA.joinedDate}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                Contact Seller
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mt-12 border-b border-brand-light/30">
          {['products', 'reviews', 'policies'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === tab ? 'text-ink' : 'text-ink/40 hover:text-ink/70'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-1 bg-accent rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-12">
          {activeTab === 'products' && (
            <div className="animate-fade-up">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-ink">All Products</h3>
                <select className="bg-background border border-brand-light/50 text-ink rounded-lg px-4 py-2 font-medium focus:outline-none focus:border-accent">
                  <option>Most Popular</option>
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_PRODUCTS.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-card rounded-2xl p-8 border border-brand-light/30 animate-fade-up space-y-6">
              <h3 className="text-2xl font-black text-ink mb-4">Customer Reviews</h3>
              <div className="border-b border-brand-light/40 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-accent text-accent" />)}
                  <span className="font-bold text-ink text-sm">Verified Buyer</span>
                </div>
                <p className="text-ink/80 text-sm font-medium">"The quality of the leather briefcase is unmatched. Exceeded my expectations!"</p>
                <span className="text-xs text-ink/40 font-semibold mt-2 block">— Michael S., 3 days ago</span>
              </div>
              <div className="border-b border-brand-light/40 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-accent text-accent" />)}
                  <span className="font-bold text-ink text-sm">Verified Buyer</span>
                </div>
                <p className="text-ink/80 text-sm font-medium">"Super fast shipping and exquisite craftmanship. Will definitely order again."</p>
                <span className="text-xs text-ink/40 font-semibold mt-2 block">— Sarah T., 1 week ago</span>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="max-w-3xl space-y-8 animate-fade-up">
              <div className="bg-card p-8 rounded-2xl border border-brand-light/30">
                <h4 className="text-xl font-bold text-ink mb-4">Shipping Policy</h4>
                <p className="text-ink/70">Orders are typically processed within 2-3 business days. Domestic shipping usually takes 3-5 business days. International shipping is available and rates are calculated at checkout.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-brand-light/30">
                <h4 className="text-xl font-bold text-ink mb-4">Returns & Exchanges</h4>
                <p className="text-ink/70">We accept returns within 30 days of delivery. Items must be unused and in original condition. Custom or personalized items cannot be returned unless defective.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
