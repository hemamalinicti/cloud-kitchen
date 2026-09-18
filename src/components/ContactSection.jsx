import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COIMBATORE_LOCATIONS } from '../data/initialData';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Clock, Users } from 'lucide-react';

export default function ContactSection() {
  const { isFestiveMode } = useApp();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Coimbatore Corporate Lunch',
    peopleCount: '25',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', eventType: 'Coimbatore Corporate Lunch', peopleCount: '25', notes: '' });
    }, 4000);
  };

  const whatsappMessage = encodeURIComponent(
    "Hello CloudKitchen Coimbatore! I would like to place an order / inquire about daily tiffin service in RS Puram / Peelamedu."
  );

  return (
    <section id="contact" className="relative bg-amber-50/50 text-slate-900 pb-6 sm:pb-20 pt-0">
      
      {/* Contact Top Hero Banner with Background Image (Full Bleed - No Top Gap) */}
      <div className="relative bg-slate-950 text-white pt-24 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-8 overflow-hidden shadow-2xl border-b-4 border-orange-500 mb-8 sm:mb-12">
        {/* Contact & Catering Background Image */}
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1800&q=80"
          alt="Contact & Coimbatore Catering Background"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Soft Transparent Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/85 backdrop-blur-[1px]" />

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-yellow-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <span>Coimbatore Kitchen Hub</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black font-serif leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] tracking-tight">
            Contact & Coimbatore Bulk Order Enquiries
          </h1>

          <p className="text-sm sm:text-lg font-black text-amber-100 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] bg-slate-950/60 p-3.5 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            Planning an office lunch in RS Puram or Peelamedu, family function, or wedding catering in Coimbatore? We cater authentic Tamil meal boxes for groups of 10 to 200 people.
          </p>
        </div>
      </div>

      <div className="max-w-[96%] sm:max-w-[94%] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* Available Locations Badges */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-orange-200 shadow-md space-y-3 sm:space-y-4 text-center">
          <h4 className="text-xs sm:text-base font-black uppercase tracking-wider text-red-600 flex items-center justify-center gap-1.5 sm:gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" /> Doorstep Delivery Available Across Coimbatore:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5 text-xs sm:text-sm font-bold">
            {COIMBATORE_LOCATIONS.map((loc) => (
              <span key={loc} className="bg-yellow-100 text-slate-950 font-black px-2 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border border-yellow-300 flex items-center justify-center text-center truncate">
                📍 {loc}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Quick Contact Actions */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-xl space-y-6">
            <h3 className="text-2xl font-black text-slate-900 font-serif border-b border-slate-100 pb-3">
              Quick Kovai Actions
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-4">
              {/* WhatsApp Quick Order Button */}
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full px-3 py-3 sm:px-5 sm:py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black flex flex-col sm:flex-row items-center justify-between shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] group border border-emerald-500 text-center sm:text-left gap-2 sm:gap-3.5"
              >
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs font-extrabold text-emerald-100 uppercase tracking-wider">WhatsApp</span>
                    <span className="text-xs sm:text-lg font-black tracking-tight whitespace-nowrap">+91 98765 43210</span>
                  </div>
                </div>
                <span className="hidden sm:inline text-xl font-black group-hover:translate-x-1 transition-transform">→</span>
              </a>

              {/* Click-to-Call Button */}
              <a
                href="tel:+919876543210"
                className="w-full px-3 py-3 sm:px-5 sm:py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black flex flex-col sm:flex-row items-center justify-between shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] group border border-orange-400 text-center sm:text-left gap-2 sm:gap-3.5"
              >
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 text-yellow-200 shadow-inner">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs font-extrabold text-amber-100 uppercase tracking-wider">Call Directly</span>
                    <span className="text-xs sm:text-lg font-black tracking-tight whitespace-nowrap">+91 98765 43210</span>
                  </div>
                </div>
                <span className="hidden sm:inline text-xl font-black group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Operating Details Info Cards */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-3.5 p-3.5 bg-yellow-50/70 rounded-2xl border border-yellow-200">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-[11px] font-black uppercase text-red-600 tracking-wider">Cooking Hours</span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">07:00 AM - 10:00 PM (Mon - Sun)</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-yellow-50/70 rounded-2xl border border-yellow-200">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-[11px] font-black uppercase text-red-600 tracking-wider">Coimbatore Kitchen Address</span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-relaxed">
                    CloudKitchen Hub #142, D.B. Road, R.S. Puram, Coimbatore, Tamil Nadu - 641002
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Bulk Order Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border-2 border-orange-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900 font-serif">Coimbatore Bulk Catering</h3>
              <span className="text-xs bg-yellow-400 text-slate-950 font-black px-3.5 py-1 rounded-full border border-yellow-500">10+ Meals</span>
            </div>

            {formSubmitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto text-3xl font-bold">
                  ✓
                </div>
                <h4 className="text-xl font-black text-slate-900">Enquiry Received!</h4>
                <p className="text-sm font-semibold text-slate-600 max-w-sm mx-auto">
                  Vannakam! Chef Muruganandam will call you on your mobile within 15 minutes to confirm bulk pricing for Coimbatore.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-slate-800 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senthil Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-800 mb-1.5">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-slate-800 mb-1.5">Event Type</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm sm:text-base font-semibold"
                    >
                      <option>Coimbatore Corporate Office Lunch</option>
                      <option>Birthday / Family Function</option>
                      <option>Weekend Festival Sappadu</option>
                      <option>Traditional Wedding Feast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-800 mb-1.5">Approx. Number of People</label>
                    <input
                      type="number"
                      value={formData.peopleCount}
                      onChange={(e) => setFormData({ ...formData, peopleCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm sm:text-base font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-800 mb-1.5">Delivery Location & Dish Requests</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need 20 Kongu Kozhi Kuzhambu boxes & 15 Ghee Podi Idli boxes in Peelamedu"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm sm:text-base font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-red-600 via-orange-500 to-green-600 hover:opacity-90 text-white font-black text-base rounded-2xl shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> Submit Bulk Order Enquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
