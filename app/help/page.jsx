"use client";

import { useState, useMemo } from 'react';
import { Search, ChevronDown, MessageCircle, Truck, RefreshCcw, ShieldCheck, ShoppingBag, Store } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const FAQ_CATEGORIES = [
  { id: 'buyers', label: 'For Buyers', icon: ShoppingBag },
  { id: 'sellers', label: 'For Sellers', icon: Store },
  { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
  { id: 'returns', label: 'Returns & Refunds', icon: RefreshCcw },
];

const FAQS = {
  buyers: [
    { q: "How do I track my order?", a: "You can track your order in real-time by navigating to Profile > Orders. Click on any specific order to see its current transit status and courier tracking link." },
    { q: "Are my payment details secure?", a: "Absolutely. Vendly uses industry-leading Stripe encryption for all transactions. We never store your raw credit card information on our servers." },
    { q: "Can I cancel my order?", a: "Orders can be canceled within 2 hours of placement. After this window, vendors typically begin processing the order, and you will need to initiate a return once it arrives." },
    { q: "How do I leave a review?", a: "After your order is delivered and marked complete, you'll receive an email prompt to leave a review. You can also navigate to Profile > Orders and click 'Leave a Review' on any fulfilled order." },
    { q: "Can I buy from multiple vendors at once?", a: "Yes! That's one of Vendly's core features. Add products from any number of independent vendors to your cart and check out in a single transaction. Payments are automatically split and routed to each seller." },
  ],
  sellers: [
    { q: "How do I get paid?", a: "Payouts are automatically routed to your connected Stripe Express account on a rolling 3-day basis after an order is marked as delivered." },
    { q: "What are the seller fees?", a: "Vendly charges a flat 5% commission on all sales, plus standard Stripe payment processing fees (2.9% + 30¢). There are no monthly subscription fees." },
    { q: "How do I handle returns?", a: "Sellers can define their own return policies in the Dashboard > Policies section. If you accept returns, buyers will automatically be issued a return label billed to your account." },
    { q: "How do I add a new product?", a: "From your Vendor Dashboard, click 'Add Product' in the top-right corner. You can upload up to 8 images via Cloudinary, set your price, stock count, and category, then publish." },
    { q: "When will my vendor account be approved?", a: "Vendor applications are reviewed by our admin team within 1–2 business days. You'll receive an email once your account is approved or if any additional information is required." },
  ],
  shipping: [
    { q: "How long does shipping take?", a: "Shipping times vary by vendor and destination. Each vendor sets their own processing time (typically 1–3 business days). Standard domestic shipping usually takes 3–7 business days after dispatch." },
    { q: "Do vendors ship internationally?", a: "Some vendors offer international shipping. Available shipping options and rates are shown at checkout based on your delivery address. Look for the 'Ships Internationally' badge on product pages." },
    { q: "How is shipping calculated?", a: "Shipping costs are calculated at checkout based on the vendor's shipping configuration, your delivery address, and the weight/size of your order. Many vendors offer free shipping above a threshold." },
    { q: "What if my package is lost in transit?", a: "If your tracking shows no movement for more than 7 business days, contact the vendor directly through your Order page. If the issue isn't resolved within 48 hours, our support team will step in to assist." },
  ],
  returns: [
    { q: "What is the general return window?", a: "Return windows are set by individual vendors — most offer 14 to 30 days from delivery. You can find each vendor's specific return policy on their store page under the 'Policies' tab." },
    { q: "How do I start a return?", a: "Go to Profile > Orders, select the order, and click 'Request Return'. Fill in the reason and submit. The vendor will review and, if approved, you'll receive a prepaid return label via email." },
    { q: "When will I get my refund?", a: "Once the vendor confirms receipt of the returned item, the refund is processed immediately through Stripe. It typically appears on your statement within 5–10 business days depending on your bank." },
    { q: "What if I received a damaged or wrong item?", a: "If your item arrives damaged or is incorrect, open a dispute within 48 hours via Profile > Orders. Attach a photo of the issue. Vendly will automatically issue a full refund or replacement at no cost to you." },
  ],
};

// Flatten all FAQs for searching across categories
const ALL_FAQS_FLAT = Object.entries(FAQS).flatMap(([category, faqs]) =>
  faqs.map(faq => ({ ...faq, category }))
);

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('buyers');
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Live search: filters across ALL categories when query is typed
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return ALL_FAQS_FLAT.filter(
      faq => faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const displayFaqs = searchResults ?? FAQS[activeCategory] ?? FAQS.buyers;
  const isSearching = !!searchQuery.trim();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pb-20 font-sans">
        {/* Help Hero */}
        <div className="bg-brand py-20 px-6 relative overflow-hidden border-b border-brand-light/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-accent/10 blur-[100px] pointer-events-none rounded-full"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">help you?</span>
            </h1>
            
            <div className="relative max-w-2xl mx-auto mt-8">
              <input 
                type="text" 
                placeholder="Search for articles, questions, or topics..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setOpenFaq(null); }}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 transition-all shadow-xl backdrop-blur-md font-medium text-lg"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50" size={24} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors text-sm font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Categories Sidebar — hidden during search */}
            {!isSearching && (
              <div className="lg:col-span-1 space-y-2 animate-fade-up">
                <h3 className="font-bold text-ink/40 text-xs uppercase tracking-widest mb-4 ml-4">Categories</h3>
                {FAQ_CATEGORIES.map(category => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => { setActiveCategory(category.id); setOpenFaq(null); }}
                      className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                        isActive 
                        ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                        : 'bg-transparent text-ink/70 hover:bg-card hover:text-ink'
                      }`}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      {category.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* FAQ Accordions */}
            <div className={`${isSearching ? 'lg:col-span-4' : 'lg:col-span-3'} animate-fade-up`} style={{ animationDelay: '0.1s' }}>
              <div className="bg-card border border-brand-light/50 rounded-[2rem] shadow-xl p-8 md:p-10">
                <h2 className="text-3xl font-black text-ink mb-2">
                  {isSearching
                    ? `Search Results`
                    : `${activeCategory.replace('-', ' ')} FAQs`}
                </h2>
                {isSearching && (
                  <p className="text-sm text-ink/50 mb-6 font-medium">
                    Found <span className="font-bold text-ink">{displayFaqs.length}</span> result{displayFaqs.length !== 1 ? 's' : ''} for &ldquo;<span className="text-accent">{searchQuery}</span>&rdquo;
                  </p>
                )}
                {!isSearching && <div className="mb-8" />}
                
                {displayFaqs.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-lg font-bold text-ink mb-2">No results found</h3>
                    <p className="text-ink/50 text-sm">Try a different search term or browse by category.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayFaqs.map((faq, index) => {
                      const isOpen = openFaq === index;
                      return (
                        <div 
                          key={index} 
                          className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                            isOpen ? 'border-accent bg-accent/5' : 'border-brand-light/50 bg-background hover:border-brand-light'
                          }`}
                        >
                          <button 
                            onClick={() => toggleFaq(index)}
                            className="w-full flex justify-between items-center p-6 text-left"
                          >
                            <div>
                              {isSearching && (
                                <span className="text-[10px] font-bold text-accent/80 uppercase tracking-widest mb-1 block">
                                  {FAQ_CATEGORIES.find(c => c.id === faq.category)?.label}
                                </span>
                              )}
                              <h4 className={`text-lg font-bold pr-8 ${isOpen ? 'text-accent-dark' : 'text-ink'}`}>
                                {faq.q}
                              </h4>
                            </div>
                            <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : 'text-ink/40'}`}>
                              <ChevronDown size={20} strokeWidth={2.5} />
                            </div>
                          </button>
                          
                          <div 
                            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                              isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <p className="text-ink/70 leading-relaxed font-medium">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Still need help CTA */}
              <div className="mt-8 bg-brand rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white mb-2">Still need help?</h3>
                  <p className="text-white/70 font-medium">Our support team is available 24/7 to assist you.</p>
                </div>
                <Link href="/contact" className="relative z-10 shrink-0 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 flex items-center gap-2">
                  <MessageCircle size={20} /> Contact Support
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
