"use client";

import { CheckCircle2, ShoppingCart, TrendingUp } from "lucide-react";

const THEMES = [
  {
    name: "Midnight & Coral",
    description: "Vibrant and high energy",
    colors: {
      background: "#FAFAFA",
      card: "#FFFFFF",
      ink: "#09090B",
      brand: "#18181B",
      accent: "#F43F5E", // Rose/Coral
      accentGradient: "linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)"
    },
    darkColors: {
      background: "#09090B",
      card: "#18181B",
      ink: "#FAFAFA",
      brand: "#FAFAFA",
    }
  },
  {
    name: "Forest & Emerald",
    description: "Luxurious, organic, tech",
    colors: {
      background: "#F8FAFC",
      card: "#FFFFFF",
      ink: "#022C22",
      brand: "#064E3B",
      accent: "#10B981", // Emerald
      accentGradient: "linear-gradient(135deg, #34D399 0%, #059669 100%)"
    },
    darkColors: {
      background: "#022C22",
      card: "#064E3B",
      ink: "#F8FAFC",
      brand: "#F8FAFC",
    }
  },
  {
    name: "Deep Navy & Amber",
    description: "Trustworthy and premium",
    colors: {
      background: "#F8FAFC",
      card: "#FFFFFF",
      ink: "#0F172A",
      brand: "#1E293B",
      accent: "#F59E0B", // Amber
      accentGradient: "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)"
    },
    darkColors: {
      background: "#020617",
      card: "#0F172A",
      ink: "#F8FAFC",
      brand: "#F8FAFC",
    }
  },
  {
    name: "Monochrome & Crimson",
    description: "Bold, minimalist, high fashion",
    colors: {
      background: "#FFFFFF",
      card: "#F4F4F5",
      ink: "#000000",
      brand: "#000000",
      accent: "#DC2626", // Crimson Red
      accentGradient: "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)"
    },
    darkColors: {
      background: "#000000",
      card: "#09090B",
      ink: "#FFFFFF",
      brand: "#FFFFFF",
    }
  }
];

export default function ThemePreview() {
  return (
    <div className="min-h-screen bg-slate-100 p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Theme Previews</h1>
        <p className="text-slate-500 mb-10">Review these color palettes in both light and dark variations.</p>
        
        <div className="grid xl:grid-cols-2 gap-10">
          {THEMES.map((theme) => (
            <div key={theme.name} className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-slate-800">{theme.name} <span className="text-sm font-normal text-slate-500">— {theme.description}</span></h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Light Mode Preview */}
                <div 
                  className="flex-1 rounded-2xl p-6 shadow-xl"
                  style={{ backgroundColor: theme.colors.background, color: theme.colors.ink }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Light Mode</p>
                  
                  <div className="rounded-xl p-5 shadow-sm mb-4" style={{ backgroundColor: theme.colors.card }}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="font-bold text-lg">Product Name</div>
                      <div className="font-black" style={{ color: theme.colors.accent }}>$129.00</div>
                    </div>
                    
                    <button 
                      className="w-full py-3 rounded-full font-bold flex items-center justify-center gap-2 text-white shadow-md transition-transform hover:scale-105"
                      style={{ background: theme.colors.accentGradient }}
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: theme.colors.card }}>
                    <div className="p-2 rounded-full text-white" style={{ backgroundColor: theme.colors.brand }}>
                      <TrendingUp size={16} />
                    </div>
                    <span className="font-medium opacity-80">Dashboard stat</span>
                  </div>
                </div>

                {/* Dark Mode Preview */}
                <div 
                  className="flex-1 rounded-2xl p-6 shadow-xl"
                  style={{ backgroundColor: theme.darkColors.background, color: theme.darkColors.ink }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Dark Mode</p>
                  
                  <div className="rounded-xl p-5 shadow-sm mb-4 border border-white/10" style={{ backgroundColor: theme.darkColors.card }}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="font-bold text-lg">Product Name</div>
                      <div className="font-black" style={{ color: theme.colors.accent }}>$129.00</div>
                    </div>
                    
                    <button 
                      className="w-full py-3 rounded-full font-bold flex items-center justify-center gap-2 text-white shadow-lg shadow-black/50 transition-transform hover:scale-105"
                      style={{ background: theme.colors.accentGradient }}
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10" style={{ backgroundColor: theme.darkColors.card }}>
                    <div className="p-2 rounded-full" style={{ backgroundColor: theme.darkColors.brand, color: theme.darkColors.background }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-medium opacity-80">Order successful</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
