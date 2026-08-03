"use client";

import { useState } from 'react';
import { Package, Truck, CheckCircle2, Clock, MapPin, Phone, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const TRACKING_EVENTS = [
  { status: 'Order Placed', location: 'San Francisco, CA', date: 'Aug 01, 2026 - 10:30 AM', completed: true },
  { status: 'Processed & Packaged', location: 'Vendor Hub #4', date: 'Aug 01, 2026 - 02:15 PM', completed: true },
  { status: 'In Transit with FedEx', location: 'Oakland Distribution Center', date: 'Aug 02, 2026 - 08:45 AM', completed: true, active: true },
  { status: 'Out for Delivery', location: 'Local Courier Facility', date: 'Expected Aug 04, 2026', completed: false },
  { status: 'Delivered', location: 'Destination Address', date: 'Expected Aug 04, 2026', completed: false }
];

export default function OrderTrackingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pb-20 font-sans">
      {/* Top Banner */}
      <div className="bg-brand py-12 px-6 border-b border-brand-light/20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link href="/orders" className="inline-flex items-center gap-2 text-white/60 hover:text-accent text-xs font-bold uppercase tracking-wider mb-2">
              <ArrowLeft size={14} /> Back to My Orders
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-white">Track Order #VD-94821</h1>
          </div>
          <div className="bg-accent/20 border border-accent/30 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Truck size={16} /> Estimated Delivery: Aug 04
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {/* Tracking Card */}
        <div className="bg-card border border-brand-light/50 p-8 md:p-12 rounded-[2.5rem] shadow-xl space-y-10">
          
          {/* Progress Bar Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-brand-light/40">
            <div>
              <span className="text-xs font-bold text-ink/40 uppercase tracking-widest block mb-1">Carrier</span>
              <p className="text-lg font-black text-ink">FedEx Express (Tracking: 7849204921)</p>
            </div>
            <button className="px-6 py-3 rounded-full bg-accent hover:bg-accent-dark text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md">
              Copy Tracking Number
            </button>
          </div>

          {/* Vertical Timeline */}
          <div className="relative pl-6 md:pl-10 space-y-10 before:absolute before:left-3 md:before:left-5 before:top-3 before:bottom-3 before:w-1 before:bg-brand-light/40">
            {TRACKING_EVENTS.map((event, i) => (
              <div key={i} className="relative flex items-start gap-6 group">
                
                {/* Node Icon */}
                <div 
                  className={`absolute -left-6 md:-left-10 w-7 h-7 rounded-full flex items-center justify-center border-4 border-card transition-all ${
                    event.active 
                    ? 'bg-accent text-white ring-4 ring-accent/20 animate-pulse' 
                    : event.completed 
                    ? 'bg-brand text-white' 
                    : 'bg-brand-light/50 text-ink/30'
                  }`}
                >
                  {event.completed ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                </div>

                {/* Event Details */}
                <div className={`flex-1 p-5 rounded-2xl border transition-all ${
                  event.active ? 'bg-accent/5 border-accent shadow-md' : 'bg-background border-brand-light/40'
                }`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <h4 className={`text-base font-bold ${event.active ? 'text-accent' : 'text-ink'}`}>
                      {event.status}
                    </h4>
                    <span className="text-xs font-semibold text-ink/50">{event.date}</span>
                  </div>
                  <p className="text-xs font-medium text-ink/60 mt-1 flex items-center gap-1">
                    <MapPin size={12} className="text-accent" /> {event.location}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Delivery Courier Info */}
          <div className="bg-background rounded-2xl p-6 border border-brand-light/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand dark:bg-white/10 dark:text-white flex items-center justify-center font-black">
                FD
              </div>
              <div>
                <h4 className="font-bold text-ink text-sm">Assigned Courier: Alex M.</h4>
                <p className="text-xs text-ink/50 font-medium">FedEx Local Route Driver</p>
              </div>
            </div>
            <button className="w-full md:w-auto px-6 py-3 rounded-full border border-brand-light text-ink font-bold text-xs hover:bg-card transition-all flex items-center justify-center gap-2">
              <Phone size={14} /> Contact Delivery Agent
            </button>
          </div>

        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
