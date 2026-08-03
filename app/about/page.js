export const metadata = {
  title: 'About Us | Vendly',
};

import Link from 'next/link';
import { ShoppingBag, Globe, Users, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20 font-sans selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-brand py-24 sm:py-32 px-6 border-b border-brand-light/20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto text-center z-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm mb-6 border border-white/20 backdrop-blur-md">
            Our Mission
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
            Redefining the <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-light to-accent drop-shadow-md">
              E-Commerce Experience
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
            Welcome to Vendly. We're dedicated to giving you the very best products, with a focus on dependability, exceptional customer service, and empowering independent sellers.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-ink tracking-tight mb-4">Our Story</h2>
              <div className="w-24 h-1.5 bg-accent rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-ink/70 text-lg leading-relaxed font-medium">
              <p>
                Founded with a vision to make commerce better for everyone, Vendly has come a long way from its beginnings. When we first started out, our passion for helping people discover amazing products drove us to do intense research and build a platform that truly bridges the gap between creator and consumer.
              </p>
              <p>
                That passion gave us the impetus to turn hard work and inspiration into a booming digital marketplace. We now serve customers all over the world and are thrilled to be a part of the quirky, eco-friendly, and fair-trade wing of the e-commerce industry.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-card rounded-3xl border border-brand-light/50 shadow-sm hover:shadow-md transition-shadow">
                <Globe className="text-accent mb-4" size={32} strokeWidth={1.5} />
                <h4 className="text-2xl font-black text-ink mb-1">50+</h4>
                <p className="text-sm font-semibold text-ink/50 uppercase tracking-wider">Countries Served</p>
              </div>
              <div className="p-6 bg-card rounded-3xl border border-brand-light/50 shadow-sm hover:shadow-md transition-shadow">
                <Users className="text-accent mb-4" size={32} strokeWidth={1.5} />
                <h4 className="text-2xl font-black text-ink mb-1">10k+</h4>
                <p className="text-sm font-semibold text-ink/50 uppercase tracking-wider">Independent Sellers</p>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-card border border-brand-light flex items-center justify-center p-8 animate-fade-up group" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors duration-500"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 text-center space-y-6 transform group-hover:scale-105 transition-transform duration-500">
              <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mb-2">
                <ShoppingBag size={48} strokeWidth={1.5} />
              </div>
              <div className="text-7xl font-black text-ink tracking-tight">Vendly<span className="text-accent">.</span></div>
              <p className="text-ink/60 font-bold text-sm uppercase tracking-[0.2em]">
                Empowering Sellers<br/>Delighting Buyers
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-brand p-12 sm:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden animate-fade-up">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent via-accent-light to-accent"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Join Our Journey</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg md:text-xl font-medium leading-relaxed">
              We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="px-10 py-4 rounded-full bg-accent hover:bg-accent-dark text-white font-bold shadow-lg hover:shadow-accent/30 hover:-translate-y-1 transition-all duration-300">
                Get In Touch
              </Link>
              <Link href="/" className="px-10 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold backdrop-blur-sm border border-white/10 transition-all duration-300">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
