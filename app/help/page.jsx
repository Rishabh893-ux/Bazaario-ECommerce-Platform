"use client";

import { useState } from 'react';
import { Search, ChevronDown, MessageCircle, Truck, RefreshCcw, ShieldCheck, ShoppingBag, Store } from 'lucide-react';

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
    { q: "Can I cancel my order?", a: "Orders can be canceled within 2 hours of placement. After this window, vendors typically begin processing the order, and you will need to initiate a return once it arrives." }
  ],
  sellers: [
    { q: "How do I get paid?", a: "Payouts are automatically routed to your connected Stripe Express account on a rolling 3-day basis after an order is marked as delivered." },
    { q: "What are the seller fees?", a: "Vendly charges a flat 5% commission on all sales, plus standard Stripe payment processing fees (2.9% + 30¢). There are no monthly subscription fees." },
    { q: "How do I handle returns?", a: "Sellers can define their own return policies in the Dashboard > Policies section. If you accept returns, buyers will automatically be issued a return label billed to your account." }
  ]
};

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('buyers');
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const currentFaqs = FAQS[activeCategory] || FAQS.buyers;

  return (
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 transition-all shadow-xl backdrop-blur-md font-medium text-lg"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50" size={24} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-2 animate-fade-up">
            <h3 className="font-bold text-ink/40 text-xs uppercase tracking-widest mb-4 ml-4">Categories</h3>
            {FAQ_CATEGORIES.map(category => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
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

          {/* FAQ Accordions */}
          <div className="lg:col-span-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-card border border-brand-light/50 rounded-[2rem] shadow-xl p-8 md:p-10">
              <h2 className="text-3xl font-black text-ink mb-8 capitalize">{activeCategory.replace('-', ' ')} FAQs</h2>
              
              <div className="space-y-4">
                {currentFaqs.map((faq, index) => {
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
                        <h4 className={`text-lg font-bold pr-8 ${isOpen ? 'text-accent-dark' : 'text-ink'}`}>
                          {faq.q}
                        </h4>
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
            </div>

            {/* Still need help CTA */}
            <div className="mt-8 bg-brand rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-2">Still need help?</h3>
                <p className="text-white/70 font-medium">Our support team is available 24/7 to assist you.</p>
              </div>
              <button className="relative z-10 shrink-0 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 flex items-center gap-2">
                <MessageCircle size={20} /> Contact Support
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
