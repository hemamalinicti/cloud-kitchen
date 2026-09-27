import React from 'react';
import HeroFoodShowcase from '../components/HeroFoodShowcase';
import DishCard from '../components/DishCard';
import ReviewsSection from '../components/ReviewsSection';
import { useApp } from '../context/AppContext';
import { COIMBATORE_LOCATIONS } from '../data/initialData';
import { 
  ShoppingBag, 
  Sparkles, 
  Box, 
  ChefHat, 
  Star, 
  ArrowRight, 
  MapPin, 
  Truck, 
  CheckCircle2,
  UtensilsCrossed,
  Phone,
  MessageCircle
} from 'lucide-react';

export default function HomePage() {
  const { dishes, navigateTo, setIsTasteQuizOpen, setIsTiffinBuilderOpen } = useApp();

  const featuredDishes = dishes.slice(0, 4);

  const cookingTicker = [
    "🔥 Coimbatore Kongu Kozhi Kuzhambu cooking in Clay Oven",
    "🌿 Desi Ghee Podi Mini Tiffin ready for 12:30 PM Kovai delivery",
    "🌶️ Madurai Mutton Chukka pepper roasting fresh",
    "🍛 Special Pollachi Coconut Milk Fish Kuzhambu",
    "✨ Thalappakatti Style Seeraga Samba Mutton Dum Biryani"
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* South Indian Indoor Biryani Kitchen Hero Section */}
      <section className="relative lg:min-h-screen flex flex-col justify-between pt-20 sm:pt-28 md:pt-28 lg:pt-24 pb-4 lg:pb-0 overflow-hidden text-white shadow-xl">
        
        {/* Background Kitchen Image with Dark Cinematic Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/images/biryani_cooking.jpg" 
            alt="South Indian Biryani Cooking Kitchen" 
            className="w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-105 transition-transform duration-1000"
          />
          {/* Multi-stage dark gradient overlays for rich contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-red-950/75 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-transparent to-black/60" />
        </div>

        {/* Softened Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/15 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-[96%] sm:max-w-[94%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto w-full py-4 lg:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
              
              {/* Trust Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-700/60 text-yellow-300 font-extrabold text-xs sm:text-sm shadow-md backdrop-blur-md">
                <ChefHat className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="truncate">Authentic Kovai Home Kitchen • RS Puram, Coimbatore</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.18] font-serif text-white">
                Fresh Kovai <br />
                <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                  Tamil Home Food
                </span> <br />
                Delivered Hot.
              </h1>

              {/* Sub-headline */}
              <p className="text-sm sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium text-red-100/90 leading-relaxed">
                Cooked daily in RS Puram with cold-pressed gingelly oil, A2 Desi Ghee & hand-ground Kongu masalas. 100% Preservative-Free.
              </p>

              {/* CTA Action Buttons - Stacked on Mobile, Row on Desktop */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                <button
                  onClick={() => navigateTo('menu')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 hover:from-red-700 hover:to-yellow-400 text-white font-black text-sm sm:text-base shadow-xl shadow-red-950/40 hover:scale-105 active:scale-95 transition-all border border-yellow-300/30"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Order Today's Menu
                </button>

                <button
                  onClick={() => setIsTiffinBuilderOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all border border-yellow-400"
                >
                  <Box className="w-5 h-5 text-slate-950" />
                  Custom Tiffin Box
                </button>
              </div>

              {/* Quick Contact & Hotline Strip in Hero */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400 text-slate-950 hover:bg-yellow-300 transition-colors shadow-md text-xs font-black"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-950" />
                  <span>Call: +91 98765 43210</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-md text-xs font-black"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp Orders</span>
                </a>
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-950/70 text-red-200 border border-red-800/70 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>RS Puram Hub, Kovai</span>
                </span>
              </div>

              {/* Secondary Taste Quiz Link */}
              <div className="pt-1">
                <button 
                  onClick={() => setIsTasteQuizOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-300 hover:text-white transition-all"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
                  Not sure what to order? Take our 1-Min Taste Quiz →
                </button>
              </div>

              {/* Quick Food Preview Thumbnails in Hero */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <span className="text-xs font-bold text-red-200 uppercase tracking-wider">Top Favorites:</span>
                <div className="flex items-center -space-x-2">
                  {dishes.slice(0, 4).map((d, i) => (
                    <img
                      key={i}
                      src={d.image}
                      alt={d.name}
                      title={d.name}
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-yellow-400 object-cover hover:scale-125 hover:z-20 transition-all cursor-pointer shadow-md"
                      onClick={() => navigateTo('menu')}
                    />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-yellow-300 bg-red-900/60 px-2.5 py-1 rounded-full border border-red-700/50">
                  +15 Fresh Dishes
                </span>
              </div>

              {/* Trust Metric Strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-red-800/40 max-w-md mx-auto lg:mx-0 text-center">
                <div className="p-2.5 sm:p-3 bg-red-950/40 rounded-2xl border border-red-800/50 shadow-sm backdrop-blur-sm">
                  <span className="text-lg sm:text-2xl font-black text-yellow-300 block">1,500+</span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-red-100">Kovai Diners</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-red-950/40 rounded-2xl border border-red-800/50 shadow-sm backdrop-blur-sm">
                  <span className="text-lg sm:text-2xl font-black text-yellow-300 flex items-center justify-center gap-1">
                    4.9 <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-red-100">User Rating</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-red-950/40 rounded-2xl border border-red-800/50 shadow-sm backdrop-blur-sm">
                  <span className="text-lg sm:text-2xl font-black text-green-400 block">100%</span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-red-100">Natural Ingredients</span>
                </div>
              </div>

            </div>

            {/* Right Hero Food Showcase */}
            <div className="lg:col-span-6">
              <HeroFoodShowcase />
            </div>

          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="mt-8 sm:mt-12 w-full bg-red-950/70 text-yellow-300 py-2.5 sm:py-3 overflow-hidden shadow-inner border-y border-red-800/50">
          <div className="flex whitespace-nowrap animate-marquee gap-8 text-[11px] sm:text-xs font-black uppercase tracking-wider">
            {[...cookingTicker, ...cookingTicker].map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                {item} <span className="text-red-600/70">|</span>
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* Featured Today's Specials */}
      <section className="max-w-[96%] sm:max-w-[94%] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-orange-200 pb-3 sm:pb-4">
          <div>
            <span className="text-xs font-black uppercase text-red-600 tracking-wider">Chef's Top Tamil Picks</span>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 mt-1">Today's Kovai Specials</h2>
          </div>
          <button
            onClick={() => navigateTo('menu')}
            className="text-xs sm:text-sm font-black text-orange-600 hover:text-red-600 flex items-center gap-1.5 hover:underline w-fit"
          >
            View Full Menu <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredDishes.map((dish) => (
            <DishCard 
              key={dish.id} 
              dish={dish} 
              simple={true}
              onClick={() => navigateTo('menu')}
            />
          ))}
        </div>
      </section>

      {/* Why Diners Love CloudKitchen (3 Interactive Feature Cards in 2 Columns on Mobile) */}
      <section className="max-w-[96%] sm:max-w-[94%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 pt-2 pb-4">
          {/* Card 1: Hand-Ground Tamil Masalas */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-orange-100 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 lg:-translate-y-3 animate-float group hover:shadow-orange-500/15 hover:border-orange-300 flex flex-col justify-between">
            <div className="relative h-28 sm:h-36 overflow-hidden bg-orange-50">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
                alt="Hand-Ground Tamil Masalas"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-md border border-white/30">
                <UtensilsCrossed className="w-4 h-4 sm:w-6 sm:h-6 animate-icon-wiggle group-hover:scale-125 transition-transform" />
              </div>
            </div>
            <div className="p-3.5 sm:p-5 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
              <h3 className="text-xs sm:text-lg font-black text-slate-900 font-serif group-hover:text-red-600 transition-colors leading-snug">Hand-Ground Tamil Masalas</h3>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                We never use store-bought powders. Spices are roasted & ground daily in RS Puram with cold-pressed oil.
              </p>
            </div>
          </div>

          {/* Card 2: Flexible Meal Subscriptions */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-amber-100 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 lg:translate-y-3 animate-float-reverse group hover:shadow-amber-500/15 hover:border-amber-300 flex flex-col justify-between">
            <div className="relative h-28 sm:h-36 overflow-hidden bg-yellow-50">
              <img
                src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
                alt="Flexible Meal Subscriptions"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-md border border-white/30">
                <Box className="w-4 h-4 sm:w-6 sm:h-6 animate-icon-bounce group-hover:scale-125 transition-transform" />
              </div>
            </div>
            <div className="p-3.5 sm:p-5 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
              <h3 className="text-xs sm:text-lg font-black text-slate-900 font-serif group-hover:text-amber-600 transition-colors leading-snug">Flexible Meal Subscriptions</h3>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                Choose from 7 meal combos across 7, 15, or 30 days. Pause or skip anytime with 1 tap.
              </p>
            </div>
          </div>

          {/* Card 3: Hot Thermal Box Delivery */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-emerald-100 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 lg:-translate-y-2 animate-float group col-span-2 md:col-span-1 hover:shadow-emerald-500/15 hover:border-emerald-300 flex flex-col justify-between">
            <div className="relative h-28 sm:h-36 overflow-hidden bg-emerald-50">
              <img
                src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80"
                alt="Hot Thermal Box Delivery"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-green-600 text-white flex items-center justify-center font-bold shadow-md border border-white/30">
                <Truck className="w-4 h-4 sm:w-6 sm:h-6 animate-icon-drive group-hover:scale-125 transition-transform" />
              </div>
            </div>
            <div className="p-3.5 sm:p-5 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
              <h3 className="text-xs sm:text-lg font-black text-slate-900 font-serif group-hover:text-green-600 transition-colors leading-snug">Hot Thermal Box Delivery</h3>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                Delivered steaming hot in eco-friendly leakproof containers right to your home or office in Coimbatore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coimbatore Delivery Available Locations & Tiffin Box Builder Section */}
      <section className="max-w-[96%] sm:max-w-[94%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Coimbatore Delivery Coverage */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 border-2 border-orange-100 shadow-xl space-y-5 sm:space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-orange-500 to-green-600 text-white flex items-center justify-center font-bold shadow-md flex-shrink-0">
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-red-600 tracking-wider block">Doorstep Delivery Coverage</span>
                    <h3 className="text-lg sm:text-2xl font-black text-slate-900 font-serif leading-tight">Active Delivery Locations in Coimbatore</h3>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit border border-green-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> 30-Mins Hot Delivery
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5 pt-4">
                {COIMBATORE_LOCATIONS.map((location) => (
                  <div
                    key={location}
                    className="p-2 sm:p-2.5 bg-yellow-50 rounded-2xl border border-yellow-200 hover:border-orange-500 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center gap-0.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-xs font-black text-slate-900">{location}</span>
                    <span className="text-[9px] text-green-700 font-extrabold bg-green-100 px-1.5 py-0.2 rounded-full">Active</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 font-bold text-center pt-2 border-t border-slate-100">
              📍 Kitchen Hub: #142, D.B. Road, R.S. Puram, Coimbatore - 641002 | Delivering within 12km radius.
            </p>
          </div>

          {/* Right Column: Interactive Tiffin Box Builder */}
          <div className="lg:col-span-5 bg-gradient-to-br from-red-900 via-amber-900 to-red-950 rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col justify-between space-y-5 sm:space-y-6 border border-red-700/50 relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3.5 sm:space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 text-xs font-black px-3.5 py-1.5 rounded-full border border-yellow-400/30 backdrop-blur-sm">
                <Box className="w-4 h-4 text-yellow-400" />
                <span>Interactive Tiffin Builder</span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black font-serif leading-snug text-white">
                Design Your Own <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                  Daily Tamil Meal Box
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-red-100/90 font-medium leading-relaxed">
                Customize your meal box! Pick 1 main curry, 2 poriyals/kootu, 2 parottas/rice, and 1 Jigarthanda with instant price calculation.
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-200">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>100% Customized Dish Combinations</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-200">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>Real-Time Instant Price Calculation</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-200">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>Hot Eco-Friendly Thermal Packaging</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsTiffinBuilderOpen(true)}
              className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all border border-yellow-300 relative z-10"
            >
              <Box className="w-5 h-5 text-slate-950" />
              Open Tiffin Box Builder →
            </button>
          </div>

        </div>
      </section>

      {/* Auto-Moving Reviews Section */}
      <ReviewsSection />

    </div>
  );
}
