"use client";

import Link from 'next/link';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

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
  }
];

export default function BlogPage() {
  const featuredArticle = ARTICLES.find(a => a.featured);
  const regularArticles = ARTICLES.filter(a => !a.featured);

  return (
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

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Featured Article */}
        {featuredArticle && (
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

        {/* Load More */}
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <button className="px-8 py-3 rounded-full border-2 border-brand text-brand font-bold hover:bg-brand hover:text-white transition-colors">
            Load More Articles
          </button>
        </div>

      </div>
    </div>
  );
}
