"use client";

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
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
              Have a question or want to work together? We&apos;d love to hear from you. Drop us a message below and our team will get back to you shortly.
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
                        <a href="mailto:support@vendly.com" className="text-lg font-bold text-ink hover:text-accent transition-colors">
                          support@vendly.com
                        </a>
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
                    Support hours: Monday to Friday<br/>9:00 AM – 6:00 PM (PST)
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-card border border-brand-light/50 p-10 md:p-12 rounded-[2.5rem] shadow-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 animate-pop-in">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black text-ink mb-3">Message Sent!</h3>
                  <p className="text-ink/60 font-medium max-w-sm leading-relaxed mb-8">
                    Thanks for reaching out. Our support team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', message: '' }); }}
                    className="px-8 py-3.5 rounded-full bg-ink text-white font-bold hover:bg-brand-dark transition-all shadow-md hover:-translate-y-0.5"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-ink mb-8 tracking-tight">Send us a message</h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-xs font-bold text-ink/60 uppercase tracking-wider">First Name</label>
                        <input 
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                          className="w-full px-5 py-4 bg-background border border-brand-light/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-medium text-ink placeholder:text-ink/30" 
                          placeholder="John" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-xs font-bold text-ink/60 uppercase tracking-wider">Last Name</label>
                        <input 
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={form.lastName}
                          onChange={handleChange}
                          className="w-full px-5 py-4 bg-background border border-brand-light/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-medium text-ink placeholder:text-ink/30" 
                          placeholder="Doe" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-bold text-ink/60 uppercase tracking-wider">Email Address</label>
                      <input 
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-background border border-brand-light/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-medium text-ink placeholder:text-ink/30" 
                        placeholder="john@example.com" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-xs font-bold text-ink/60 uppercase tracking-wider">Message</label>
                      <textarea 
                        id="message"
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-background border border-brand-light/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-medium text-ink placeholder:text-ink/30 resize-none" 
                        rows="6" 
                        placeholder="How can we help you today?"
                      ></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full py-4 bg-brand hover:bg-brand-dark text-white text-base font-bold rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {submitting ? (
                          <>
                            <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
