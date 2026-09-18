import React, { useState } from 'react';
import { Utensils, ShieldCheck, X, MessageCircle, Clock, CheckCircle2, Lock, FileText, Sparkles, Truck, Instagram, Phone, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { navigateTo } = useApp();
  const [modalType, setModalType] = useState(null); // 'privacy' | 'terms' | null

  return (
    <footer className="relative pt-6 sm:pt-16 pb-4 sm:pb-8 border-t border-slate-800 bg-slate-950 text-white">
      {/* 4-Color Gradient Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-red-600 via-orange-500 via-yellow-400 to-green-600" />

      <div className="max-w-[94%] mx-auto pl-4 pr-3 sm:pl-8 sm:pr-6 lg:pl-10 lg:pr-8 space-y-6 sm:space-y-12 pt-1 sm:pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Brand Info */}
          <div className="col-span-1 space-y-2.5 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <img
                src="/images/logo_icon.png"
                alt="CloudKitchen Logo"
                className="h-9 sm:h-12 w-auto object-contain rounded-xl bg-white/95 p-1 shadow-md"
              />
              <div className="flex flex-col justify-center">
                <span className="text-xl sm:text-2xl font-black font-serif tracking-tight text-white leading-none">
                  Cloud<span className="text-red-500">Kitchen</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-yellow-400 tracking-wider uppercase mt-0.5 sm:mt-1">
                  Coimbatore Tamil Home Food
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-normal sm:leading-relaxed">
              Authentic Tamil Nadu & Kongu Nadu home-style meals cooked fresh in our FSSAI-licensed Coimbatore home kitchen with pure A2 Desi Ghee & Gingelly oil.
            </p>

            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-black text-emerald-400 bg-slate-900 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-slate-800 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> FSSAI Licensed Home Kitchen
            </div>

            {/* Social & Contact Icons (Footer Left Corner) */}
            <div className="flex items-center gap-2.5 pt-1 sm:pt-2">
              {/* Instagram Icon */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 flex items-center justify-center transition-all shadow-md group"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:text-white group-hover:scale-110 transition-transform" />
              </a>

              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-white hover:bg-emerald-600 flex items-center justify-center transition-all shadow-md group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:text-white group-hover:scale-110 transition-transform" />
              </a>

              {/* Message / SMS Icon */}
              <a
                href="sms:+919876543210"
                title="Message"
                aria-label="Message"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white hover:bg-blue-600 flex items-center justify-center transition-all shadow-md group"
              >
                <MessageSquare className="w-4 h-4 text-blue-400 group-hover:text-white group-hover:scale-110 transition-transform" />
              </a>

              {/* Phone Icon */}
              <a
                href="tel:+919876543210"
                title="Phone Call"
                aria-label="Phone Call"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-yellow-500 text-slate-300 hover:text-white hover:bg-yellow-500 flex items-center justify-center transition-all shadow-md group"
              >
                <Phone className="w-4 h-4 text-yellow-400 group-hover:text-slate-950 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-yellow-400 mb-1.5 sm:mb-4">Quick Navigation</h4>
            <ul className="space-y-1 sm:space-y-2.5 text-xs sm:text-sm text-slate-300 font-bold">
              <li><button onClick={() => navigateTo('home')} className="hover:text-yellow-300 transition-colors text-left">Home</button></li>
              <li><button onClick={() => navigateTo('kitchen')} className="hover:text-yellow-300 transition-colors text-left">About Kitchen</button></li>
              <li><button onClick={() => navigateTo('menu')} className="hover:text-yellow-300 transition-colors text-left">Daily Menu</button></li>
              <li><button onClick={() => navigateTo('subscriptions')} className="hover:text-yellow-300 transition-colors text-left">Subscriptions</button></li>
              <li><button onClick={() => navigateTo('gallery')} className="hover:text-yellow-300 transition-colors text-left">Gallery</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-yellow-300 transition-colors text-left">Contact Us</button></li>
            </ul>
          </div>

          {/* Coimbatore Kitchen Address & Contact */}
          <div className="col-span-1">
            <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-yellow-400 mb-1.5 sm:mb-4">Coimbatore Kitchen Hub</h4>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
              <p className="font-extrabold text-white">📍 CloudKitchen Hub #142, D.B. Road, R.S. Puram, Coimbatore, Tamil Nadu - 641002</p>
              <p>📞 Phone: +91 98765 43210</p>
              <p>💬 WhatsApp: +91 98765 43210</p>
              <p>⏰ 07:00 AM - 10:00 PM (Everyday)</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 font-bold gap-2 sm:gap-4">
          <p>© {new Date().getFullYear()} CloudKitchen Coimbatore. All rights reserved.</p>
          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={() => setModalType('privacy')} 
              className="hover:text-yellow-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => setModalType('terms')} 
              className="hover:text-yellow-300 transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy / Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-200 text-slate-900 max-h-[85vh] flex flex-col justify-between">
            
            {/* Modal Header Banner */}
            <div className="bg-gradient-to-r from-red-600 via-orange-500 via-yellow-500 to-green-600 p-6 text-white relative">
              <button
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/40 text-white hover:bg-slate-950 flex items-center justify-center transition-all shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-yellow-300">
                  {modalType === 'privacy' ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-yellow-200 tracking-wider block">Coimbatore CloudKitchen Legal</span>
                  <h3 className="text-2xl font-black font-serif text-white">
                    {modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                  </h3>
                </div>
              </div>

              {/* FSSAI Badge Pill */}
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-slate-950 bg-yellow-300 px-3 py-1 rounded-full border border-yellow-400 mt-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-green-700" /> FSSAI Licensed Home Kitchen
              </div>
            </div>

            {/* Modal Navigation Tabs Switcher */}
            <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
              <button
                onClick={() => setModalType('privacy')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
                  modalType === 'privacy'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-orange-100 border border-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Privacy Policy
              </button>
              <button
                onClick={() => setModalType('terms')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
                  modalType === 'terms'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-orange-100 border border-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" /> Terms & Conditions
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[55vh]">
              {modalType === 'privacy' ? (
                <div className="space-y-4">
                  {/* Card 1 */}
                  <div className="p-4 bg-green-50/80 rounded-2xl border-2 border-green-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-green-900 font-black text-base">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <span>1. Customer Data Privacy</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      We collect basic customer ordering information (Full Name, Mobile Number, Coimbatore Delivery Address) solely for fresh Tamil meal preparation and doorstep dispatch.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 bg-yellow-50/80 rounded-2xl border-2 border-yellow-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-yellow-950 font-black text-base">
                      <Lock className="w-5 h-5 text-yellow-600" />
                      <span>2. 100% Encrypted Payment Security</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      All online transactions are securely encrypted via SSL protocol. CloudKitchen never stores credit/debit card numbers, CVVs, or UPI PIN secrets.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 bg-orange-50/80 rounded-2xl border-2 border-orange-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-orange-950 font-black text-base">
                      <MessageCircle className="w-5 h-5 text-orange-600" />
                      <span>3. Real-Time Order Communications</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      Automated WhatsApp and SMS alerts are sent exclusively to communicate kitchen preparation progress, cut-off reminders, and delivery driver location.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="p-4 bg-red-50/80 rounded-2xl border-2 border-red-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-red-950 font-black text-base">
                      <Sparkles className="w-5 h-5 text-red-600" />
                      <span>4. Zero Third-Party Data Sharing</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      Your phone number and address are strictly confidential. We guarantee zero selling or sharing of personal data with external telemarketers or advertisers.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Card 1 */}
                  <div className="p-4 bg-red-50/80 rounded-2xl border-2 border-red-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-red-950 font-black text-base">
                      <Clock className="w-5 h-5 text-red-600" />
                      <span>1. Daily Lunch Cut-Off & Pre-Orders</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      Pre-orders for Kovai lunch boxes must be placed prior to the countdown cut-off time to guarantee fresh 12:30 PM doorstep delivery across RS Puram & Peelamedu.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 bg-yellow-50/80 rounded-2xl border-2 border-yellow-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-yellow-950 font-black text-base">
                      <Utensils className="w-5 h-5 text-yellow-600" />
                      <span>2. FSSAI Certified Home Culinary Hygiene</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      All food is prepared daily in FSSAI-inspected home kitchens using 100% RO purified water, pure A2 Desi Ghee, cold-pressed gingelly oil, and zero MSG.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 bg-green-50/80 rounded-2xl border-2 border-green-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-green-950 font-black text-base">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span>3. Doorstep Delivery Coverage (Coimbatore)</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      Doorstep delivery is active within Gandhipuram, RS Puram, Peelamedu, Saravanampatti, Race Course, Singanallur, Saibaba Colony, Vadavalli, and Kovaipudur.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="p-4 bg-orange-50/80 rounded-2xl border-2 border-orange-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-orange-950 font-black text-base">
                      <CheckCircle2 className="w-5 h-5 text-orange-600" />
                      <span>4. Flexible Subscription Pause & Cancellations</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      Tiffin subscriptions can be paused, modified, or skipped anytime with 12 hours advance notification via WhatsApp or direct kitchen hotline (+91 98765 43210).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Bar */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-bold">📍 RS Puram Hub, Coimbatore</span>
              <button
                onClick={() => setModalType(null)}
                className="px-6 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-sm rounded-xl transition-all shadow-md"
              >
                Close Legal Document
              </button>
            </div>

          </div>
        </div>
      )}
    </footer>
  );
}
