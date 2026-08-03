export const metadata = {
  title: 'Contact Us | Vendly',
};

import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-6 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-ink tracking-tight mb-6 pb-2">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-ink/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Have a question or want to work together? We'd love to hear from you. Drop us a message below and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Contact Information Panel */}
          <div className="lg:col-span-2 space-y-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-card p-10 rounded-[2.5rem] shadow-xl border border-brand-light/50 h-full flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div>
                <h3 className="text-3xl font-black text-ink mb-10 tracking-tight">Contact Info</h3>
                <div className="space-y-10">
                  <div className="flex items-start gap-5">
                    <div className="p-3.5 bg-accent/10 text-accent rounded-2xl shrink-0">
                      <Phone size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-bold text-ink/40 text-xs uppercase tracking-widest mb-1">Phone</p>
                      <p className="text-lg font-bold text-ink">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="p-3.5 bg-accent/10 text-accent rounded-2xl shrink-0">
                      <Mail size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-bold text-ink/40 text-xs uppercase tracking-widest mb-1">Email</p>
                      <p className="text-lg font-bold text-ink hover:text-accent transition-colors cursor-pointer">
                        support@vendly.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="p-3.5 bg-accent/10 text-accent rounded-2xl shrink-0">
                      <MapPin size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-bold text-ink/40 text-xs uppercase tracking-widest mb-1">Office</p>
                      <p className="text-lg font-bold text-ink leading-snug">
                        123 Commerce St.<br />Tech Valley, CA 94000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 pt-8 border-t border-brand-light/50">
                <p className="text-ink/60 font-medium text-sm">
                  Support hours: Monday to Friday<br/>9:00 AM - 6:00 PM (PST)
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-card border border-brand-light/50 p-10 md:p-12 rounded-[2.5rem] shadow-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-black text-ink mb-8 tracking-tight">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-ink/60 uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-background border border-brand-light/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-medium text-ink placeholder:text-ink/30" 
                    placeholder="John" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-ink/60 uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-background border border-brand-light/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-medium text-ink placeholder:text-ink/30" 
                    placeholder="Doe" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-ink/60 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-5 py-4 bg-background border border-brand-light/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-medium text-ink placeholder:text-ink/30" 
                  placeholder="john@example.com" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-ink/60 uppercase tracking-wider">Message</label>
                <textarea 
                  className="w-full px-5 py-4 bg-background border border-brand-light/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-medium text-ink placeholder:text-ink/30 resize-none" 
                  rows="6" 
                  placeholder="How can we help you today?"
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button 
                  type="button" 
                  className="w-full py-4 bg-brand hover:bg-brand-dark text-white text-base font-bold rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
