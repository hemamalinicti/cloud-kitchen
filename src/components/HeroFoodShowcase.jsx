import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Flame, Sparkles, ChefHat, Plus, Eye, Check, ChevronRight, ChevronLeft, Camera } from 'lucide-react';

export default function HeroFoodShowcase() {
  const { dishes, addToCart, setSelectedDishDetail, navigateTo } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredDishes = dishes.slice(0, 3);
  const currentDish = featuredDishes[activeIndex] || dishes[0];

  useEffect(() => {
    if (!featuredDishes.length) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredDishes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [featuredDishes.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % featuredDishes.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + featuredDishes.length) % featuredDishes.length);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      
      {/* Glow Effects */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-spicy-600 via-brand-500 to-sun-400 rounded-3xl blur-2xl opacity-40 animate-pulse-glow" />

      {/* Main Glassmorphic Showcase Card */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-brand-200/80 space-y-5 overflow-hidden">
        
        {/* Steam Particle Effect Overlay */}
        <div className="absolute top-10 right-16 pointer-events-none flex gap-3 z-10 opacity-70">
          <div className="w-2 h-8 bg-white/60 rounded-full blur-[3px] steam-particle" />
          <div className="w-3 h-10 bg-white/50 rounded-full blur-[3px] steam-particle [animation-delay:0.7s]" />
          <div className="w-2.5 h-7 bg-white/60 rounded-full blur-[3px] steam-particle [animation-delay:1.4s]" />
        </div>

        {/* Top Chef & Tag Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-black">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-300">
            <Flame className="w-4 h-4 text-red-600 fill-red-600 animate-pulse" />
            Today's Fresh Hot Special
          </span>
          <span className="flex items-center gap-1.5 text-slate-800 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-300">
            <ChefHat className="w-4 h-4 text-orange-600" /> {currentDish.chef}
          </span>
        </div>

        {/* High-Res Food Photography Container */}
        <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-lg group">
          <img
            src={currentDish.image}
            alt={currentDish.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Floating Badges over Image */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`text-xs font-black uppercase px-3 py-1 rounded-full shadow-md text-white ${
              currentDish.type === 'veg' ? 'bg-green-600' : 'bg-red-600'
            }`}>
              100% {currentDish.type}
            </span>
            <span className="bg-yellow-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-md uppercase">
              🔥 {currentDish.calories} kcal
            </span>
          </div>

          <div className="absolute top-3 right-3 bg-yellow-400 border border-yellow-500 px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-sm font-black text-slate-950">
            <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>{currentDish.rating}</span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-2xl font-black font-serif line-clamp-1">{currentDish.name}</h3>
            <p className="text-sm text-slate-200 line-clamp-1 mt-0.5 font-semibold">{currentDish.description}</p>
          </div>

          {/* Carousel Slider Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-slate-950 transition-all opacity-80 hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-slate-950 transition-all opacity-80 hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Action Controls Row - Pure Food Gallery Focus */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <div>
            <span className="text-xs text-red-600 font-extrabold uppercase tracking-wider block">Coimbatore Home Specialty</span>
            <span className="text-sm font-black text-slate-900">100% Preservative & Chemical Free</span>
          </div>

          <button
            onClick={() => navigateTo('gallery')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
          >
            <Camera className="w-4 h-4" /> View Food Gallery →
          </button>
        </div>

        {/* Carousel Indicators Dots */}
        <div className="flex justify-center gap-1.5 pt-1">
          {featuredDishes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === idx ? 'w-6 bg-brand-500' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
