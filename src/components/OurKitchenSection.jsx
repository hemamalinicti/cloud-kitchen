import React from 'react';
import { CHEFS_DATA } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ChefHat, 
  Sparkles, 
  Target, 
  Rocket, 
  Clock, 
  Truck, 
  Utensils 
} from 'lucide-react';

export default function OurKitchenSection() {



  const whyChooseUsPoints = [
    {
      num: '01',
      icon: Utensils,
      title: '100% Authentic Home-Style Tamil Recipes',
      desc: 'Small batch cooking with Chinna Vengayam (shallots) and hand-ground spices—exactly how grandmothers cook in Erode & Madurai.',
      color: 'border-2 border-red-300/80 bg-gradient-to-b from-red-50/90 via-red-50/30 to-white text-red-950 shadow-xl shadow-red-500/10',
      iconBg: 'bg-red-600 text-white',
      badgeBg: 'bg-red-100 text-red-700 border-red-200',
      waveClass: 'animate-float-cross-tl lg:-translate-x-3 lg:-translate-y-2'
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'FSSAI License & Hygiene Guarantee',
      desc: 'Strictly inspected home kitchen hub operating under 100% RO water, A2 Desi Ghee & daily staff temperature checks.',
      color: 'border-2 border-yellow-300/80 bg-gradient-to-b from-yellow-50/90 via-amber-50/30 to-white text-yellow-950 shadow-xl shadow-amber-500/10',
      iconBg: 'bg-yellow-400 text-slate-950',
      badgeBg: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      waveClass: 'animate-float-cross-tr lg:translate-x-3 lg:-translate-y-2'
    },
    {
      num: '03',
      icon: Truck,
      title: 'Piping Hot 30-Min Doorstep Delivery',
      desc: 'Delivered in thermal insulated boxes across RS Puram, Peelamedu, Gandhipuram, Saravanampatti, Race Course & Vadavalli.',
      color: 'border-2 border-orange-300/80 bg-gradient-to-b from-orange-50/90 via-amber-50/30 to-white text-orange-950 shadow-xl shadow-orange-500/10',
      iconBg: 'bg-orange-500 text-white',
      badgeBg: 'bg-orange-100 text-orange-700 border-orange-200',
      waveClass: 'animate-float-cross-bl lg:-translate-x-3 lg:translate-y-2'
    },
    {
      num: '04',
      icon: Clock,
      title: 'Flexible Tiffin Builder & 1-Tap Pause',
      desc: 'Build your custom meal box or pause/skip subscription meals anytime 12 hours prior via WhatsApp with zero hassle.',
      color: 'border-2 border-green-400/80 bg-gradient-to-b from-green-50/90 via-emerald-50/30 to-white text-green-950 shadow-xl shadow-emerald-500/10',
      iconBg: 'bg-green-600 text-white',
      badgeBg: 'bg-green-100 text-green-700 border-green-300',
      waveClass: 'animate-float-cross-br lg:translate-x-3 lg:translate-y-2'
    }
  ];

  return (
    <section id="kitchen" className="bg-white text-slate-900 overflow-hidden pt-0 pb-12 sm:pb-20">
      
      {/* About Section Top Hero Header (Full Bleed Top Banner - No Top Gap) */}
      <div className="relative bg-slate-950 text-white pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-8 overflow-hidden shadow-2xl border-b-4 border-orange-500">
        {/* Crisp, Vibrant Culinary Background Image */}
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1800&q=80"
          alt="About Our Kitchen - Authentic Home Culinary Background"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Soft Transparent Gradient Overlay for Maximum Image & Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-slate-950/80 backdrop-blur-[1px]" />

        {/* Hero Text & Stat Content */}
        <div className="relative max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-yellow-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg">
            <ChefHat className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-spin-slow" />
            <span>About Our Kitchen Storefront</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black font-serif leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] tracking-tight">
            Authentic Tamil Home Culinary Storefront
          </h1>

          <p className="text-sm sm:text-lg font-black text-amber-100 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] bg-slate-950/60 p-3.5 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            Unlike commercial restaurants, every single dish in CloudKitchen is cooked in small batches by passionate home chefs using authentic family recipes.
          </p>

          {/* Animated Stat Strip inside Hero */}
          <div className="pt-2 max-w-4xl mx-auto">
            <div className="bg-slate-950/85 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center shadow-2xl">
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-4xl font-black font-serif block text-yellow-300 drop-shadow-md">25,000+</span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-100">Hot Meals Served</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-4xl font-black font-serif block text-yellow-300 drop-shadow-md">4.9 ★</span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-100">Customer Rating</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-4xl font-black font-serif block text-yellow-300 drop-shadow-md">100%</span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-100">Preservative Free</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-4xl font-black font-serif block text-yellow-300 drop-shadow-md">FSSAI</span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-100">Inspected Kitchen</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[94%] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-20 pt-8 sm:pt-16">

        {/* Vision & Mission Section with Images & Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Vision Card with Image Overlay & Animations */}
          <div className="group relative rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 min-h-[420px]">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80"
              alt="CloudKitchen Vision - Tamil Banana Leaf Sappadu"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/80 to-slate-950/40" />

            {/* Glowing Orb */}
            <div className="absolute top-4 right-4 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl animate-pulse-glow pointer-events-none" />

            {/* Card Content Body */}
            <div className="relative p-8 space-y-5 text-white flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-yellow-300 shadow-lg animate-float border border-white/30">
                    <Target className="w-8 h-8 animate-spin-slow" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider bg-red-600/90 text-yellow-300 px-4 py-1.5 rounded-full border border-yellow-400/40 shadow-md">
                    Our Vision
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black font-serif leading-tight">
                  Preserving Authentic Home Flavors for Every Coimbatore Household
                </h3>

                <p className="text-sm sm:text-base text-yellow-100 font-medium leading-relaxed">
                  To make wholesome, preservative-free Tamil home-cooked meals accessible every single day to families, IT professionals, and students across Coimbatore—without compromising on health or tradition.
                </p>
              </div>

              {/* Glassmorphic Checklist Badges */}
              <div className="pt-4 border-t border-white/20 flex flex-wrap gap-2 text-xs font-black">
                <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-yellow-200">
                  ✓ 100% Preservative & Soda Free
                </span>
                <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-yellow-200">
                  ✓ Pure Gingelly Oil & A2 Ghee
                </span>
                <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-yellow-200">
                  ✓ Daily Fresh Sappadu for Kovai
                </span>
              </div>
            </div>
          </div>

          {/* Mission Card with Image Overlay & Animations */}
          <div className="group relative rounded-3xl overflow-hidden shadow-2xl border-2 border-green-400 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 min-h-[420px]">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
              alt="CloudKitchen Mission - Fresh Spice Cooking"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-emerald-950/85 to-slate-950/40" />

            {/* Glowing Orb */}
            <div className="absolute top-4 right-4 w-40 h-40 bg-green-400/20 rounded-full blur-2xl animate-pulse-glow pointer-events-none" />

            {/* Card Content Body */}
            <div className="relative p-8 space-y-5 text-white flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-yellow-300 shadow-lg animate-float-reverse border border-white/30">
                    <Rocket className="w-8 h-8 animate-spin-reverse-slow" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider bg-green-600/90 text-yellow-300 px-4 py-1.5 rounded-full border border-yellow-400/40 shadow-md">
                    Our Mission
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black font-serif leading-tight">
                  Empowering Home Chefs & Delivering Zero-Chemical Goodness
                </h3>

                <p className="text-sm sm:text-base text-yellow-100 font-medium leading-relaxed">
                  To empower skilled Tamil home chefs by giving them a professional, hygienic platform while serving meals cooked exclusively in pure A2 Desi Ghee, cold-pressed gingelly oil, and 100% RO purified water.
                </p>
              </div>

              {/* Glassmorphic Checklist Badges */}
              <div className="pt-4 border-t border-white/20 flex flex-wrap gap-2 text-xs font-black">
                <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-yellow-200">
                  ✓ Empowering 20+ Master Home Chefs
                </span>
                <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-yellow-200">
                  ✓ 100% RO Purified Water Cooking
                </span>
                <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-yellow-200">
                  ✓ FSSAI Certified Hygiene Hub
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Why Choose Us Section - Staggered Dynamic Wave Layout */}
        <div className="space-y-12 pt-4 pb-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider border border-yellow-400 shadow-sm">
              <Sparkles className="w-4 h-4 text-red-600 animate-spin" />
              <span>The CloudKitchen Advantage</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black font-serif text-slate-900">
              Why Choose CloudKitchen Coimbatore?
            </h3>
            <p className="text-base text-slate-600 font-semibold">
              Discover why over 1,500 Kovai diners choose us for their daily lunches, dinner tiffins, and bulk catering.
            </p>
          </div>

          {/* 2x2 Cross Grid Layout with Diagonal Movement */}
          <div className="relative max-w-5xl mx-auto pt-6">
            
            {/* Center Cross Emblem Badge (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-red-950 text-yellow-300 font-black text-[10px] uppercase tracking-wider items-center justify-center text-center p-2 shadow-2xl border-4 border-white animate-pulse-glow pointer-events-none space-y-0.5 flex-col">
              <ChefHat className="w-5 h-5 text-yellow-400" />
              <span>Kovai Gold</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-8">
              {whyChooseUsPoints.map((pt, idx) => {
                const IconComp = pt.icon;
                return (
                  <div
                    key={idx}
                    className={`group relative p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-2.5 sm:space-y-5 transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03] hover:shadow-2xl ${pt.color} ${pt.waveClass}`}
                  >
                    {/* Icon & Step Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${pt.iconBg}`}>
                        <IconComp className="w-5 h-5 sm:w-7 sm:h-7 animate-icon-pulse group-hover:scale-125 transition-transform" />
                      </div>
                      <span className={`text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border shadow-xs ${pt.badgeBg}`}>
                        {pt.num}
                      </span>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="text-xs sm:text-xl font-black text-slate-900 leading-snug group-hover:text-red-700 transition-colors">
                        {pt.title}
                      </h4>
                      <p className="text-[11px] sm:text-sm font-semibold text-slate-700 leading-normal sm:leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>



        {/* Meet the Home Chefs Sub-Section */}
        <div className="pt-8 border-t-2 border-orange-100 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-3xl sm:text-4xl font-black font-serif text-slate-900">Meet Our Master Home Chefs</h3>
            <p className="text-base text-slate-600 font-semibold">The human stories and expertise behind your daily meals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CHEFS_DATA.map((chef, idx) => {
              const borderTheme = idx === 0 ? 'border-2 border-red-400 hover:border-red-600' : idx === 1 ? 'border-2 border-yellow-400 hover:border-yellow-500' : 'border-2 border-green-500 hover:border-green-600';
              return (
                <div
                  key={idx}
                  className={`group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between ${borderTheme}`}
                >
                  <div className="relative h-80 sm:h-96 bg-gradient-to-b from-amber-50 to-orange-50 overflow-hidden flex items-center justify-center">
                    <img
                      src={chef.avatar}
                      alt={chef.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Live Cooking Status Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md text-xs font-black text-slate-900 flex items-center gap-1.5 border border-slate-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                      Live Cooking
                    </div>

                    <div className="absolute bottom-3 left-3 bg-yellow-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md border border-yellow-500">
                      {chef.experience}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-red-600 transition-colors">{chef.name}</h4>
                    <span className="text-sm font-black text-orange-600 block">{chef.role}</span>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{chef.bio}</p>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-black text-slate-900">
                      <span className="text-slate-500 font-bold">Signature Dish:</span>
                      <span className="bg-yellow-300 text-slate-950 px-3 py-1 rounded-full shadow-xs">{chef.signatureDish}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
