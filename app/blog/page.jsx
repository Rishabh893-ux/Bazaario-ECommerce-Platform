"use client";

import Link from 'next/link';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const ALL_CATEGORIES = ["All", "Workspace", "Lifestyle", "Seller Tips", "Fashion"];

const ARTICLES = [
  {
    id: 1,
    title: "10 Minimalist Desk Setups to Boost Your Productivity",
    excerpt: "Discover how a clean workspace can clear your mind. We interviewed top designers on how they organize their digital and physical space.",
    category: "Workspace",
    date: "Aug 12, 2026",
    author: "Elena Rodriguez",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "The Rise of Artisanal Coffee Roasters",
    excerpt: "Why small-batch coffee is taking over the world, and how to brew the perfect cup at home.",
    category: "Lifestyle",
    date: "Aug 05, 2026",
    author: "James Chen",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
    featured: false
  },
  {
    id: 3,
    title: "How to Build a Successful Store on Vendly",
    excerpt: "A comprehensive guide for new sellers looking to optimize their listings and drive their first 100 sales.",
    category: "Seller Tips",
    date: "Jul 28, 2026",
    author: "Sarah Jenkins",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    featured: false
  },
  {
    id: 4,
    title: "Sustainable Fashion: Brands Making a Difference",
    excerpt: "Highlighting 5 independent clothing brands on our platform that are prioritizing the planet without compromising on style.",
    category: "Fashion",
    date: "Jul 15, 2026",
    author: "Elena Rodriguez",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    featured: false
  },
  {
    id: 5,
    title: "5 Seller Pricing Strategies That Actually Work",
    excerpt: "Stop underpricing your products. Here are proven pricing frameworks that protect your margins while staying competitive.",
    category: "Seller Tips",
    date: "Jul 02, 2026",
    author: "James Chen",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    featured: false
  },
  {
    id: 6,
    title: "The Perfect Home Office Chair: A Buyer's Guide",
    excerpt: "After testing 12 chairs over 3 months, we found the best ergonomic seating for every budget on our platform.",
    category: "Workspace",
    date: "Jun 20, 2026",
    author: "Sarah Jenkins",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
    featured: false
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  const featuredArticle = ARTICLES.find(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);
  const showFeatured = activeCategory === "All" && featuredArticle;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pb-20 font-sans">
        
        {/* Blog Header */}
        <div className="pt-20 pb-12 px-6 text-center max-w-3xl mx-auto animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-black text-ink mb-6 tracking-tight">
            The Vendly <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">Journal</span>
          </h1>
          <p className="text-lg text-ink/60 font-medium">
            Stories, tips, and insights from our community of creators, buyers, and independent brands.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-ink text-white shadow-md scale-105"
                    : "bg-card border border-brand-light/70 text-ink/70 hover:border-brand/30 hover:bg-card"
                }`}
              >
                {cat !== "All" && <Tag size={13} />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          
          {/* Featured Article */}
          {showFeatured && (
            <div className="mb-16 bg-card rounded-[2.5rem] border border-brand-light/50 overflow-hidden shadow-xl flex flex-col lg:flex-row group animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="lg:w-3/5 relative h-[300px] lg:h-[500px] overflow-hidden">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-ink shadow-lg">
                  Featured
                </div>
              </div>
              
              <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-accent font-bold text-sm uppercase tracking-widest mb-4">
                  <Tag size={16} /> {featuredArticle.category}
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-ink mb-4 leading-tight group-hover:text-accent transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-ink/70 text-lg leading-relaxed mb-8">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="mt-auto pt-8 border-t border-brand-light/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{featuredArticle.author}</p>
                      <p className="text-xs text-ink/50 font-medium">{featuredArticle.date} • {featuredArticle.readTime}</p>
                    </div>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-background border border-brand-light flex items-center justify-center text-ink group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all shadow-sm">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Article Grid */}
          {regularArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => (
                <div 
                  key={article.id} 
                  className="bg-card rounded-[2rem] border border-brand-light/50 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col animate-fade-up"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <div className="h-56 relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-ink shadow-sm">
                      {article.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-ink mb-3 leading-snug group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-ink/60 text-sm leading-relaxed mb-6 flex-1">
                      {article.excerpt}
                    </p>
                    
                    <div className="pt-6 border-t border-brand-light/50 flex items-center justify-between text-xs font-bold text-ink/40">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} /> {article.date}
                      </div>
                      <span className="text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-3xl border border-brand-light/60 flex flex-col items-center animate-fade-up">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-ink mb-2">No articles in this category yet</h3>
              <p className="text-ink/50 mb-6 text-sm">Check back soon or browse all articles.</p>
              <button onClick={() => setActiveCategory("All")} className="px-6 py-2.5 rounded-full bg-ink text-white font-bold hover:bg-brand-dark transition-colors shadow-sm">
                View All Articles
              </button>
            </div>
          )}

          {/* Newsletter Section */}
          <div className="mt-20 bg-brand-dark rounded-[2rem] p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl animate-fade-up">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
            <div className="relative z-10 md:max-w-md">
              <h3 className="text-2xl font-black text-white mb-2">Never Miss a Story</h3>
              <p className="text-white/70 text-sm font-medium">Get the latest articles, seller tips, and platform news delivered straight to your inbox.</p>
            </div>
            <form className="relative z-10 w-full md:w-auto flex-1 max-w-md flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
              />
              <button type="submit" className="px-6 py-3.5 rounded-full bg-accent hover:bg-accent-dark text-white font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
