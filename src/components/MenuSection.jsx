import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DishCard from './DishCard';
import { 
  Search, 
  Filter, 
  Calendar, 
  Sparkles, 
  SlidersHorizontal, 
  Leaf, 
  Drumstick,
  Flame,
  LayoutGrid,
  List
} from 'lucide-react';

export default function MenuSection() {
  const { dishes, isFestiveMode } = useApp();

  const [activeDate, setActiveDate] = useState('today');
  const [activeCategory, setActiveCategory] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [spiceFilter, setSpiceFilter] = useState('all'); // 'all', 1, 2, 3
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('single'); // 'single' (1 col clean), 'compact' (2 col)

  // Date buttons
  const dateOptions = [
    { id: 'today', label: "Today's Menu", date: '16 Sep' },
    { id: 'tomorrow', label: "Tomorrow's Pre-Order", date: '17 Sep' },
    { id: 'dayafter', label: "Day After", date: '18 Sep' },
  ];

  // Category buttons
  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch Box' },
    { id: 'dinner', label: 'Dinner Special' },
  ];

  // Filtered dishes calculation
  const filteredDishes = dishes.filter((dish) => {
    // Category check
    if (activeCategory !== 'all' && dish.category !== activeCategory) return false;
    // Veg/Non-veg check
    if (typeFilter !== 'all' && dish.type !== typeFilter) return false;
    // Spice check
    if (spiceFilter !== 'all' && dish.spiceLevel !== Number(spiceFilter)) return false;
    // Search query check
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = dish.name.toLowerCase().includes(q);
      const matchDesc = dish.description.toLowerCase().includes(q);
      const matchChef = dish.chef ? dish.chef.toLowerCase().includes(q) : false;
      if (!matchName && !matchDesc && !matchChef) return false;
    }
    return true;
  });

  return (
    <section id="menu" className="bg-slate-50/60 text-slate-900 pb-6 sm:pb-20 pt-0">
      
      {/* Menu Section Top Hero Banner with Background Image (Full Bleed - No Top Gap) */}
      <div className="relative bg-slate-950 text-white pt-24 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-8 overflow-hidden shadow-2xl border-b-4 border-orange-500 mb-8 sm:mb-12">
        {/* Vibrant South Indian Culinary Background Image */}
        <img
          src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1800&q=80"
          alt="Daily Fresh Tamil Food Menu Background"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Soft Transparent Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/85 backdrop-blur-[1px]" />

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-yellow-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <span>Daily Fresh Menu</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black font-serif leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] tracking-tight">
            Cooked Fresh Daily in Our Home Kitchen
          </h1>

          <p className="text-sm sm:text-lg font-black text-amber-100 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] bg-slate-950/60 p-3 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            Pick from today’s live prepared meals or reserve tomorrow’s lunch and dinner boxes in advance.
          </p>

          {/* Date Selector Tabs inside Hero */}
          <div className="pt-2 flex justify-center">
            <div className="flex flex-wrap sm:inline-flex p-1.5 sm:p-2 bg-slate-950/85 backdrop-blur-md shadow-2xl rounded-2xl border-2 border-white/20 gap-1 sm:gap-1.5 max-w-full justify-center">
              {dateOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setActiveDate(opt.id)}
                  className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-base font-black transition-all flex items-center gap-1.5 flex-1 sm:flex-none justify-center ${
                    activeDate === opt.id
                      ? 'bg-gradient-to-r from-red-600 via-orange-500 to-green-600 text-white shadow-lg scale-105'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="whitespace-nowrap">{opt.label}</span>
                  <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-mono font-bold ${
                    activeDate === opt.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-yellow-300'
                  }`}>
                    {opt.date}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[96%] sm:max-w-[94%] mx-auto px-3 sm:px-6 lg:px-8">

        {/* Search & Filter Controls Bar */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 shadow-xl border-2 border-orange-100 mb-6 sm:mb-10 space-y-4 sm:space-y-5 overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search dish, ingredient or chef..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 sm:pl-12 sm:pr-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-base font-black transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white shadow-md scale-105'
                      : 'bg-slate-100 text-slate-800 hover:bg-orange-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filters: Veg/Non-Veg & Spice level */}
          <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs sm:text-sm font-black">
            {/* Veg / Non-Veg Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
              <span className="font-black text-slate-700 uppercase tracking-wider text-[11px] sm:text-sm">Diet Filter:</span>
              <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl transition-all text-xs whitespace-nowrap ${
                    typeFilter === 'all' ? 'bg-yellow-400 text-slate-950 shadow-sm font-extrabold' : 'text-slate-600'
                  }`}
                >
                  All Diets
                </button>
                <button
                  onClick={() => setTypeFilter('veg')}
                  className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl transition-all text-xs flex items-center gap-1 whitespace-nowrap ${
                    typeFilter === 'veg' ? 'bg-green-600 text-white shadow-sm font-extrabold' : 'text-green-700'
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5" /> Veg Only
                </button>
                <button
                  onClick={() => setTypeFilter('non-veg')}
                  className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl transition-all text-xs flex items-center gap-1 whitespace-nowrap ${
                    typeFilter === 'non-veg' ? 'bg-red-600 text-white shadow-sm font-extrabold' : 'text-red-700'
                  }`}
                >
                  <Drumstick className="w-3.5 h-3.5" /> Non-Veg
                </button>
              </div>
            </div>

            {/* Spice Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
              <span className="font-black text-slate-700 uppercase tracking-wider text-[11px] sm:text-sm">Spice Level:</span>
              <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl overflow-x-auto scrollbar-none">
                {[
                  { id: 'all', label: 'All Spices', color: 'bg-yellow-400 text-slate-950' },
                  { id: '1', label: 'Mild 🌶️', color: 'bg-green-600 text-white' },
                  { id: '2', label: 'Medium 🌶️🌶️', color: 'bg-orange-500 text-white' },
                  { id: '3', label: 'Spicy 🌶️🌶️🌶️', color: 'bg-red-600 text-white' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSpiceFilter(s.id)}
                    className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl transition-all text-xs whitespace-nowrap ${
                      spiceFilter === s.id ? `${s.color} shadow-sm font-extrabold` : 'text-slate-600'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Toggle (Mobile Only) */}
            <div className="flex sm:hidden items-center justify-between pt-2 border-t border-slate-100">
              <span className="font-black text-slate-700 uppercase tracking-wider text-[11px]">Mobile Layout:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode('single')}
                  className={`px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all ${
                    viewMode === 'single' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <List className="w-3.5 h-3.5" /> Clean Cards
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={`px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all ${
                    viewMode === 'compact' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" /> 2-Col Grid
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Dish Cards Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
              🔍
            </div>
            <h3 className="text-lg font-extrabold text-slate-800">No dishes match your selected filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try resetting search or adjusting your diet and spice preferences.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setTypeFilter('all');
                setSpiceFilter('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
