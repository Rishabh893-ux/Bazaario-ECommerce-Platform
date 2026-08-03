"use client";

import { useState } from 'react';
import { Star, MapPin, Calendar, ShieldCheck, Share2, Package, Heart } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Mock data for the storefront
const STORE_DATA = {
  name: "Artisan Leather Co.",
  description: "Handcrafted, ethically sourced leather goods for the modern traveler. We believe in quality that lasts a lifetime.",
  rating: 4.9,
  reviewsCount: 1284,
  totalSales: 3847,
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

const SORT_OPTIONS = ['Most Popular', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low'];

export default function VendorStorefront() {
  const [activeTab, setActiveTab] = useState('products');
  const [following, setFollowing] = useState(false);
  const [sort, setSort] = useState('Most Popular');

  const sortedProducts = [...MOCK_PRODUCTS].sort((a, b) => {
    if (sort === 'Price: Low to High') return a.price - b.price;
    if (sort === 'Price: High to Low') return b.price - a.price;
    if (sort === 'Newest Arrivals') return b.id - a.id;
    return b.ratingCount - a.ratingCount; // Most Popular
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: STORE_DATA.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Navbar />
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
                    <span>({STORE_DATA.reviewsCount.toLocaleString()} reviews)</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full bg-brand-light/30 text-ink hover:bg-brand-light transition-colors"
                    aria-label="Share store"
                  >
                    <Share2 size={20} />
                  </button>
                  <button
                    onClick={() => setFollowing(f => !f)}
                    className={`px-6 py-3 rounded-full font-bold transition-all shadow-lg flex items-center gap-2 ${
                      following
                        ? 'bg-accent/10 border border-accent/40 text-accent hover:bg-accent/20'
                        : 'bg-brand hover:bg-brand-dark text-white'
                    }`}
                    aria-label={following ? 'Unfollow store' : 'Follow store'}
                  >
                    <Heart size={16} className={following ? 'fill-accent text-accent' : ''} />
                    {following ? 'Following' : 'Follow Store'}
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
                  <Package size={16} className="text-accent" />
                  {STORE_DATA.totalSales.toLocaleString()} sales
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
                  <h3 className="text-2xl font-black text-ink">All Products <span className="text-ink/40 text-lg font-bold">({MOCK_PRODUCTS.length})</span></h3>
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="bg-background border border-brand-light/50 text-ink rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:border-accent text-sm"
                  >
                    {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-card rounded-2xl p-8 border border-brand-light/30 animate-fade-up space-y-6">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-brand-light/40">
                  <div className="text-center">
                    <p className="text-6xl font-black text-ink">{STORE_DATA.rating}</p>
                    <div className="flex items-center gap-1 justify-center mt-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-accent text-accent" />)}
                    </div>
                    <p className="text-xs text-ink/40 font-semibold mt-1">{STORE_DATA.reviewsCount.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-ink/50 w-4">{star}</span>
                        <div className="flex-1 h-2 bg-brand-light/40 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: star === 5 ? '78%' : star === 4 ? '14%' : star === 3 ? '5%' : '2%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-ink mb-4">Customer Reviews</h3>
                {[
                  { name: "Michael S.", date: "3 days ago", text: "The quality of the leather briefcase is unmatched. Exceeded my expectations!" },
                  { name: "Sarah T.", date: "1 week ago", text: "Super fast shipping and exquisite craftsmanship. Will definitely order again." },
                  { name: "David L.", date: "2 weeks ago", text: "Bought the cardholder as a gift. The recipient absolutely loved it. Premium quality all around." },
                ].map((review, i) => (
                  <div key={i} className="border-b border-brand-light/40 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-accent text-accent" />)}
                      <span className="font-bold text-ink text-sm ml-1">Verified Buyer</span>
                    </div>
                    <p className="text-ink/80 text-sm font-medium mb-2">&ldquo;{review.text}&rdquo;</p>
                    <span className="text-xs text-ink/40 font-semibold">— {review.name}, {review.date}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'policies' && (
              <div className="max-w-3xl space-y-6 animate-fade-up">
                {[
                  {
                    title: "Shipping Policy",
                    body: "Orders are typically processed within 2–3 business days. Domestic shipping usually takes 3–5 business days. International shipping is available and rates are calculated at checkout. All orders are shipped with tracking."
                  },
                  {
                    title: "Returns & Exchanges",
                    body: "We accept returns within 30 days of delivery. Items must be unused and in original condition. Custom or personalized items cannot be returned unless defective. To start a return, contact us through your Order page."
                  },
                  {
                    title: "Quality Guarantee",
                    body: "Every piece is hand-inspected before shipping. If you receive a defective or damaged item, contact us within 48 hours and we will replace it or issue a full refund — no questions asked."
                  }
                ].map(policy => (
                  <div key={policy.title} className="bg-card p-8 rounded-2xl border border-brand-light/30">
                    <h4 className="text-xl font-bold text-ink mb-4">{policy.title}</h4>
                    <p className="text-ink/70 leading-relaxed">{policy.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
