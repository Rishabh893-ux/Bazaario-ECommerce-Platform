export const metadata = {
  title: 'Contact Us | Vendly',
};

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-6 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#ffe000]/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#799f0c]/10 blur-[100px] pointer-events-none"></div>
      
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-ink/70 hover:text-[#799f0c] transition-colors text-sm font-medium bg-card px-4 py-2 rounded-full border border-[#799f0c]/20 shadow-sm hover:shadow-md backdrop-blur-sm">
          <ArrowLeft size={16} />
          Go Back
        </Link>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffe000] to-[#799f0c] mb-6 pb-2">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto font-medium">
            Have a question or want to work together? We'd love to hear from you. Drop us a message below and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Information Panel */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-[#ffe000] to-[#799f0c] p-10 rounded-squircle text-white shadow-2xl h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-8">Contact Info</h3>
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-white/20 rounded-full shrink-0 shadow-inner">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-white/70 text-sm uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-xl font-semibold">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-white/20 rounded-full shrink-0 shadow-inner">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-white/70 text-sm uppercase tracking-wider mb-1">Email</p>
                      <p className="text-xl font-semibold">support@vendly.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-white/20 rounded-full shrink-0 shadow-inner">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-medium text-white/70 text-sm uppercase tracking-wider mb-1">Office</p>
                      <p className="text-lg font-semibold leading-snug">123 Commerce St.<br />Tech Valley, CA 94000</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-white/80 font-medium">Follow us on social media for updates and offers!</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-card border border-[#799f0c]/20 p-10 rounded-squircle shadow-xl shadow-[#799f0c]/5">
            <h3 className="text-2xl font-bold text-ink mb-8">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-ink/80 mb-2">First Name</label>
                  <input type="text" className="w-full px-5 py-3.5 bg-background border border-ink/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799f0c] focus:border-transparent transition-all shadow-sm" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink/80 mb-2">Last Name</label>
                  <input type="text" className="w-full px-5 py-3.5 bg-background border border-ink/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799f0c] focus:border-transparent transition-all shadow-sm" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink/80 mb-2">Email Address</label>
                <input type="email" className="w-full px-5 py-3.5 bg-background border border-ink/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799f0c] focus:border-transparent transition-all shadow-sm" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink/80 mb-2">Message</label>
                <textarea className="w-full px-5 py-3.5 bg-background border border-ink/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799f0c] focus:border-transparent transition-all resize-none shadow-sm" rows="5" placeholder="How can we help you?"></textarea>
              </div>
              <div className="pt-2">
                <button type="button" className="w-full py-4 bg-gradient-to-r from-[#ffe000] to-[#799f0c] text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-[#799f0c]/40 hover:-translate-y-1 transition-all duration-300">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
