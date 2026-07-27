export const metadata = {
  title: 'About Us | Vendly',
};

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#F3E5D8] to-[#E6D0BA] py-24 px-6 border-b border-[#D2B48C]/50">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20 mix-blend-multiply"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#1E293B] mb-6 tracking-tight drop-shadow-sm">
            Redefining the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E293B] via-[#334155] to-[#1E293B] drop-shadow-md">E-Commerce Experience</span>
          </h1>
          <p className="text-lg md:text-xl text-[#334155] max-w-2xl mx-auto leading-relaxed font-medium">
            Welcome to Vendly. We're dedicated to giving you the very best products, with a focus on dependability, exceptional customer service, and uniqueness.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-ink">Our Story</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-brand rounded-full"></div>
            <p className="text-ink/80 leading-relaxed text-lg">
              Founded with a vision to make commerce better for everyone, Vendly has come a long way from its beginnings. When we first started out, our passion for helping people discover amazing products drove us to do intense research.
            </p>
            <p className="text-ink/80 leading-relaxed text-lg">
              That passion gave us the impetus to turn hard work and inspiration into a booming online store. We now serve customers all over the world and are thrilled to be a part of the quirky, eco-friendly, and fair-trade wing of the industry.
            </p>
          </div>
          <div className="relative h-[400px] rounded-squircle overflow-hidden shadow-2xl bg-gradient-to-br from-[#F3E5D8] to-[#E6D0BA] flex items-center justify-center p-8 border border-[#D2B48C]/50">
            <div className="text-center space-y-4">
              <div className="text-7xl font-black text-[#1E293B] drop-shadow-sm">Vendly.</div>
              <p className="text-[#1E293B]/70 font-semibold text-lg uppercase tracking-widest">Empowering Sellers<br/>Delighting Buyers</p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center bg-card border border-[#D2B48C]/50 p-12 rounded-squircle shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F3E5D8] to-[#E6D0BA]"></div>
          <h2 className="text-3xl font-bold text-ink mb-4">Join Our Journey</h2>
          <p className="text-ink/80 max-w-xl mx-auto mb-8 text-lg">
            We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to reach out.
          </p>
          <a href="/contact" className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#F3E5D8] to-[#E6D0BA] text-[#1E293B] font-bold hover:shadow-xl hover:shadow-[#D2B48C]/30 hover:-translate-y-1 transition-all duration-300">
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
}
