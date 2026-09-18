import React, { useState, useEffect } from 'react';
import { WEEKLY_SUBSCRIPTION_MENU } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  ArrowRight,
  Sun,
  Utensils,
  Moon,
  Clock,
  Crown,
  Flame,
  Coffee,
  Check,
  Filter,
  Layers
} from 'lucide-react';

export const SUBSCRIPTION_CATEGORIES = [
  {
    id: 'breakfast',
    name: 'Breakfast Only',
    badgeName: 'Breakfast',
    icon: Coffee,
    color: 'from-amber-500 to-yellow-500',
    borderColor: 'border-yellow-400',
    bgLight: 'bg-yellow-50',
    accentText: 'text-amber-700',
    description: 'Hot Kovai morning tiffins with Kumbakonam filter coffee delivered by 7:30 AM.',
    slots: ['breakfast'],
    slotLabels: ['Breakfast (07:30 AM)'],
    durations: {
      '7': { pricePerMeal: 99, total: 693, discount: 'Save 15%', badge: '7-Day Trial Pack' },
      '15': { pricePerMeal: 89, total: 1335, discount: 'Save 22%', badge: '15-Day Value Pack' },
      '30': { pricePerMeal: 79, total: 2370, discount: 'Save 32%', badge: '30-Day Best Seller' }
    }
  },
  {
    id: 'lunch',
    name: 'Lunch Only',
    badgeName: 'Lunch',
    icon: Utensils,
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-400',
    bgLight: 'bg-orange-50',
    accentText: 'text-orange-700',
    description: 'Traditional Kovai Banana Leaf Sappadu & Biryani boxes delivered hot by 12:30 PM.',
    slots: ['lunch'],
    slotLabels: ['Lunch Box (12:30 PM)'],
    durations: {
      '7': { pricePerMeal: 149, total: 1043, discount: 'Save 15%', badge: '7-Day Weekly Pack' },
      '15': { pricePerMeal: 135, total: 2025, discount: 'Save 22%', badge: '15-Day Fortnight Pack' },
      '30': { pricePerMeal: 119, total: 3570, discount: 'Save 35%', badge: '30-Day Monthly Saver' }
    }
  },
  {
    id: 'dinner',
    name: 'Dinner Only',
    badgeName: 'Dinner',
    icon: Moon,
    color: 'from-indigo-600 to-purple-600',
    borderColor: 'border-indigo-400',
    bgLight: 'bg-indigo-50',
    accentText: 'text-indigo-700',
    description: 'Fresh evening Kothu Parottas, Ghee Podi Idlis & gravy boxes delivered by 07:30 PM.',
    slots: ['dinner'],
    slotLabels: ['Dinner Box (07:30 PM)'],
    durations: {
      '7': { pricePerMeal: 149, total: 1043, discount: 'Save 15%', badge: '7-Day Evening Pack' },
      '15': { pricePerMeal: 135, total: 2025, discount: 'Save 22%', badge: '15-Day Fortnight Pack' },
      '30': { pricePerMeal: 119, total: 3570, discount: 'Save 35%', badge: '30-Day Night Tiffin' }
    }
  },
  {
    id: 'breakfast_lunch',
    name: 'Breakfast + Lunch Combo',
    badgeName: 'Breakfast + Lunch',
    icon: Sun,
    color: 'from-amber-600 to-orange-600',
    borderColor: 'border-amber-500',
    bgLight: 'bg-amber-50',
    accentText: 'text-amber-800',
    description: 'Full daytime coverage! Morning tiffin + hearty lunch delivered right on schedule.',
    slots: ['breakfast', 'lunch'],
    slotLabels: ['Breakfast (07:30 AM)', 'Lunch Box (12:30 PM)'],
    durations: {
      '7': { pricePerMeal: 129, total: 1806, discount: 'Save 18%', badge: '7-Day (14 Meals)' },
      '15': { pricePerMeal: 115, total: 3450, discount: 'Save 25%', badge: '15-Day (30 Meals)' },
      '30': { pricePerMeal: 99, total: 5940, discount: 'Save 38%', badge: '30-Day (60 Meals) Popular' }
    }
  },
  {
    id: 'lunch_dinner',
    name: 'Lunch + Dinner Combo',
    badgeName: 'Lunch + Dinner',
    icon: Flame,
    color: 'from-red-600 to-orange-600',
    borderColor: 'border-red-500',
    bgLight: 'bg-red-50',
    accentText: 'text-red-700',
    description: 'No cooking all day! Afternoon Kovai meals + hot night dinner box delivered daily.',
    slots: ['lunch', 'dinner'],
    slotLabels: ['Lunch Box (12:30 PM)', 'Dinner Box (07:30 PM)'],
    durations: {
      '7': { pricePerMeal: 139, total: 1946, discount: 'Save 18%', badge: '7-Day (14 Meals)' },
      '15': { pricePerMeal: 125, total: 3750, discount: 'Save 25%', badge: '15-Day (30 Meals)' },
      '30': { pricePerMeal: 109, total: 6540, discount: 'Save 38%', badge: '30-Day (60 Meals) Most Popular' }
    }
  },
  {
    id: 'dinner_breakfast',
    name: 'Dinner + Breakfast Combo',
    badgeName: 'Dinner + Breakfast',
    icon: Clock,
    color: 'from-purple-600 to-indigo-600',
    borderColor: 'border-purple-500',
    bgLight: 'bg-purple-50',
    accentText: 'text-purple-800',
    description: 'Perfect for night shifts & early risers! Evening meal + next morning tiffin combo.',
    slots: ['dinner', 'breakfast'],
    slotLabels: ['Dinner Box (07:30 PM)', 'Next Morning Breakfast (07:30 AM)'],
    durations: {
      '7': { pricePerMeal: 129, total: 1806, discount: 'Save 18%', badge: '7-Day (14 Meals)' },
      '15': { pricePerMeal: 115, total: 3450, discount: 'Save 25%', badge: '15-Day (30 Meals)' },
      '30': { pricePerMeal: 99, total: 5940, discount: 'Save 38%', badge: '30-Day (60 Meals) Shift Special' }
    }
  },
  {
    id: 'full_day',
    name: 'Breakfast + Lunch + Dinner (All-Day)',
    badgeName: 'Breakfast + Lunch + Dinner',
    icon: Crown,
    color: 'from-emerald-600 via-teal-600 to-green-700',
    borderColor: 'border-emerald-500 ring-4 ring-emerald-500/20',
    bgLight: 'bg-emerald-50',
    accentText: 'text-emerald-800',
    description: 'Ultimate 3-meal complete food solution! Fresh breakfast, lunch, and dinner delivered daily.',
    slots: ['breakfast', 'lunch', 'dinner'],
    slotLabels: ['Breakfast (07:30 AM)', 'Lunch Box (12:30 PM)', 'Dinner Box (07:30 PM)'],
    durations: {
      '7': { pricePerMeal: 119, total: 2499, discount: 'Save 22%', badge: '7-Day (21 Meals) VIP Trial' },
      '15': { pricePerMeal: 105, total: 4725, discount: 'Save 32%', badge: '15-Day (45 Meals) VIP Pack' },
      '30': { pricePerMeal: 89, total: 8010, discount: 'Save 45%', badge: '30-Day (90 Meals) Ultimate Best Value' }
    }
  }
];

export default function SubscriptionsSection() {
  const { isFestiveMode } = useApp();

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedDurationFilter, setSelectedDurationFilter] = useState('all');
  
  // Rotational Schedule Slot View state ('breakfast' | 'lunch' | 'dinner' | 'all')
  const [rotationalSlotFilter, setRotationalSlotFilter] = useState('breakfast');
  const [activeDay, setActiveDay] = useState('Monday');
  const [scheduleViewMode, setScheduleViewMode] = useState('grid'); // 'grid' or 'daily'

  // Booking Modal State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(SUBSCRIPTION_CATEGORIES[0]);
  const [modalDuration, setModalDuration] = useState('30');
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');

  // Auto sync Rotational Schedule Filter when category changes
  const handleSelectCategory = (catId) => {
    setSelectedCategoryFilter(catId);
    if (catId === 'breakfast') setRotationalSlotFilter('breakfast');
    else if (catId === 'lunch') setRotationalSlotFilter('lunch');
    else if (catId === 'dinner') setRotationalSlotFilter('dinner');
    else if (catId === 'breakfast_lunch') setRotationalSlotFilter('breakfast_lunch');
    else if (catId === 'lunch_dinner') setRotationalSlotFilter('lunch_dinner');
    else if (catId === 'dinner_breakfast') setRotationalSlotFilter('dinner_breakfast');
    else if (catId === 'full_day') setRotationalSlotFilter('all');
    else setRotationalSlotFilter('all');
  };

  const handleSubscribeClick = (category, durationKey) => {
    setModalCategory(category);
    setModalDuration(durationKey);
    setSubmitted(false);
    setIsBookModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsBookModalOpen(false);
      setUserName('');
      setUserPhone('');
      setUserAddress('');
    }, 3000);
  };

  // Filter Categories & Durations
  const filteredCategories = selectedCategoryFilter === 'all' 
    ? SUBSCRIPTION_CATEGORIES 
    : SUBSCRIPTION_CATEGORIES.filter(c => c.id === selectedCategoryFilter);

  const durationOptions = [
    { key: 'all', label: 'All Durations (7, 15, 30 Days)' },
    { key: '7', label: '7 Days Plans' },
    { key: '15', label: '15 Days Plans' },
    { key: '30', label: '30 Days Plans' }
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Calculate active slots to show in the rotational schedule
  const getActiveSlotsForSchedule = () => {
    if (rotationalSlotFilter === 'breakfast') return ['breakfast'];
    if (rotationalSlotFilter === 'lunch') return ['lunch'];
    if (rotationalSlotFilter === 'dinner') return ['dinner'];
    if (rotationalSlotFilter === 'breakfast_lunch') return ['breakfast', 'lunch'];
    if (rotationalSlotFilter === 'lunch_dinner') return ['lunch', 'dinner'];
    if (rotationalSlotFilter === 'dinner_breakfast') return ['dinner', 'breakfast'];
    return ['breakfast', 'lunch', 'dinner'];
  };

  const activeScheduleSlots = getActiveSlotsForSchedule();

  const getSlotMeta = (slot) => {
    switch (slot) {
      case 'breakfast':
        return { 
          title: 'Breakfast Slot (07:30 AM)', 
          icon: '🌅', 
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          cardBg: 'bg-amber-50/90 border-amber-200' 
        };
      case 'lunch':
        return { 
          title: 'Lunch Slot (12:30 PM)', 
          icon: '🌞', 
          badgeBg: 'bg-red-100 text-red-900 border-red-300',
          cardBg: 'bg-orange-50/90 border-orange-200' 
        };
      case 'dinner':
        return { 
          title: 'Dinner Slot (07:30 PM)', 
          icon: '🌙', 
          badgeBg: 'bg-yellow-300 text-slate-950 border-yellow-400',
          cardBg: 'bg-yellow-50/90 border-yellow-200' 
        };
      default:
        return { 
          title: 'Meal Slot', 
          icon: '🍛', 
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
          cardBg: 'bg-slate-50 border-slate-200' 
        };
    }
  };

  return (
    <section id="subscriptions" className="relative bg-amber-50/50 text-slate-900 pb-6 sm:pb-20 pt-0">
      
      {/* Subscriptions Section Top Hero Banner with Background Image (Full Bleed - No Top Gap) */}
      <div className="relative bg-slate-950 text-white pt-24 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-8 overflow-hidden shadow-2xl border-b-4 border-orange-500 mb-8 sm:mb-12">
        {/* Crisp Food Subscription Background Image */}
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1800&q=80"
          alt="Tamil Meal Subscriptions Background"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Soft Transparent Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/85 backdrop-blur-[1px]" />

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-yellow-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-spin-slow" />
            <span>7x3 Recurring Meal Plans (21 Flexible Options)</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black font-serif leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] tracking-tight">
            Hassle-Free Daily Tamil Meal Subscriptions
          </h1>

          <p className="text-sm sm:text-lg font-black text-amber-100 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] bg-slate-950/60 p-3.5 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            Choose from 7 meal combinations (Breakfast, Lunch, Dinner, or Combos) across 7, 15, or 30 days. Cooked fresh in RS Puram & delivered hot to your doorstep!
          </p>
        </div>
      </div>

      <div className="max-w-[96%] sm:max-w-[94%] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* Compact Mobile Meal Navigation Bar */}
        <div className="block sm:hidden bg-white rounded-2xl p-2.5 shadow-lg border border-orange-200 mb-4 sticky top-16 z-30">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: 'breakfast', label: 'Breakfast', icon: '☕' },
              { id: 'lunch', label: 'Lunch', icon: '🍛' },
              { id: 'dinner', label: 'Dinner', icon: '🌙' },
              { id: 'breakfast_lunch', label: 'Bfrst+Lunch', icon: '🌅' },
              { id: 'lunch_dinner', label: 'Lunch+Dinner', icon: '🔥' },
              { id: 'dinner_breakfast', label: 'Dinner+Bfrst', icon: '⏰' },
              { id: 'full_day', label: 'All-Day 3 Meals', icon: '👑' },
            ].map((tab) => {
              const isActive = selectedCategoryFilter === tab.id || (selectedCategoryFilter === 'all' && tab.id === 'breakfast');
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white shadow-md scale-105'
                      : 'bg-slate-100 text-slate-800 hover:bg-orange-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar (Desktop View) */}
        <div className="hidden sm:block bg-white rounded-3xl p-6 shadow-xl border-2 border-orange-100 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-black text-slate-900">Explore Meal Combinations (7 Categories)</h3>
            </div>

            {/* Duration Quick Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <span className="text-xs font-black uppercase text-slate-500 whitespace-nowrap">Duration:</span>
              {durationOptions.map((dur) => (
                <button
                  key={dur.key}
                  onClick={() => setSelectedDurationFilter(dur.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all whitespace-nowrap ${
                    selectedDurationFilter === dur.key
                      ? 'bg-slate-900 text-yellow-300 shadow-md scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-orange-100'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          {/* 7 Category Pill Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            <button
              onClick={() => handleSelectCategory('all')}
              className={`p-3 rounded-2xl text-xs font-black flex flex-col items-center justify-center gap-1.5 transition-all ${
                selectedCategoryFilter === 'all'
                  ? 'bg-gradient-to-r from-red-600 via-orange-500 to-green-600 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-orange-100'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>All 7 Combos</span>
            </button>

            {SUBSCRIPTION_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isActive = selectedCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`p-3 rounded-2xl text-xs font-black flex flex-col items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                      : 'bg-slate-100 text-slate-800 hover:bg-orange-100'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                  <span className="text-center line-clamp-1">{cat.badgeName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 7x3 Subscription Plans Render Grid */}
        <div className="space-y-16">
          {filteredCategories.map((category) => {
            const IconComp = category.icon;
            const keysToDisplay = selectedDurationFilter === 'all' 
              ? ['7', '15', '30'] 
              : [selectedDurationFilter];

            return (
              <div 
                key={category.id} 
                className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 ${category.borderColor} space-y-8 relative overflow-hidden`}
              >
                {/* Category Banner Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center font-black shadow-lg flex-shrink-0`}>
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full ${category.bgLight} ${category.accentText}`}>
                          {category.badgeName}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {category.slots.length} Meal{category.slots.length > 1 ? 's' : ''} / Day
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 font-serif mt-1">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Slot Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {category.slotLabels.map((slot, sIdx) => (
                      <span key={sIdx} className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
                        ⏰ {slot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3 Duration Cards Grid (7 Days, 15 Days, 30 Days) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {keysToDisplay.map((durationKey) => {
                    const planDetails = category.durations[durationKey];
                    const numDays = parseInt(durationKey, 10);
                    const totalMeals = numDays * category.slots.length;

                    const isPopular = durationKey === '30';

                    return (
                      <div
                        key={durationKey}
                        className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                          isPopular
                            ? 'bg-gradient-to-b from-white to-orange-50/60 border-2 border-orange-500 shadow-xl ring-4 ring-orange-500/10'
                            : 'bg-white border-2 border-slate-200 hover:border-orange-300 shadow-md'
                        }`}
                      >
                        {planDetails.badge && (
                          <span className={`absolute -top-3.5 right-6 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md ${
                            isPopular ? 'bg-orange-600 text-white' : 'bg-slate-900 text-yellow-300'
                          }`}>
                            {planDetails.badge}
                          </span>
                        )}

                        <div className="space-y-5">
                          {/* Duration Title & Pricing */}
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                              {durationKey}-Day Subscription
                            </span>
                            <div className="flex items-baseline justify-between gap-2 mt-2">
                              <div>
                                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                                  ₹{planDetails.pricePerMeal}
                                </span>
                                <span className="text-xs font-bold text-slate-600"> / meal</span>
                              </div>
                              <span className="text-xs font-black text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-300">
                                {planDetails.discount}
                              </span>
                            </div>

                            <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                              <span>Total ({totalMeals} Meals):</span>
                              <span className="text-sm font-black text-slate-900">₹{planDetails.total.toLocaleString('en-IN')}</span>
                            </div>
                          </div>

                          {/* Plan Features */}
                          <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs font-bold text-slate-800">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>{totalMeals} authentic Tamil meals ({durationKey} days)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>Free RS Puram doorstep delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>Pause / skip meal anytime with 1 tap</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>Includes Friday Special Dish & Dessert</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA Subscribe Button */}
                        <button
                          onClick={() => handleSubscribeClick(category, durationKey)}
                          className={`mt-6 w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                            isPopular
                              ? 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-orange-500/20'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          Subscribe {durationKey} Days Plan — ₹{planDetails.total.toLocaleString('en-IN')} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic 7-Day Rotational Tamil Menu Schedule */}
        <div id="rotational-menu-section" className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-orange-200 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-red-600 tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Rotational Tamil Menu Schedule</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 font-serif mt-1">
                7-Day Rotational Tamil Menu
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                Explore authentic home-cooked Tamil dishes curated for all 7 days of the week.
              </p>
            </div>

            {/* Rotational Slot Filter Switcher */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setRotationalSlotFilter('breakfast')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  rotationalSlotFilter === 'breakfast'
                    ? 'bg-amber-500 text-white shadow-md scale-105'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                <span>🌅 Breakfast (7 Days)</span>
              </button>

              <button
                onClick={() => setRotationalSlotFilter('lunch')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  rotationalSlotFilter === 'lunch'
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                <span>🌞 Lunch (7 Days)</span>
              </button>

              <button
                onClick={() => setRotationalSlotFilter('dinner')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  rotationalSlotFilter === 'dinner'
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                <span>🌙 Dinner (7 Days)</span>
              </button>

              <button
                onClick={() => setRotationalSlotFilter('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  rotationalSlotFilter === 'all'
                    ? 'bg-gradient-to-r from-red-600 via-orange-500 to-green-600 text-white shadow-md scale-105'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                <span>👑 All Meals (Combos)</span>
              </button>
            </div>
          </div>

          {/* View Mode Toggle & Day Tabs Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Active View: {rotationalSlotFilter.toUpperCase().replace('_', ' + ')} MENU SCHEDULE
              </span>
            </div>

            {/* View Mode Switcher (Grid / Daily) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setScheduleViewMode('grid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  scheduleViewMode === 'grid'
                    ? 'bg-slate-900 text-yellow-300 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                📊 7-Day Grid View
              </button>
              <button
                onClick={() => setScheduleViewMode('daily')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  scheduleViewMode === 'daily'
                    ? 'bg-slate-900 text-yellow-300 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                📅 Day-by-Day View
              </button>
            </div>
          </div>

          {/* VIEW 1: 7-DAY FULL GRID VIEW */}
          {scheduleViewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 pt-2">
              {daysOfWeek.map((day) => {
                const dayMenu = WEEKLY_SUBSCRIPTION_MENU[day];
                const isToday = day === activeDay;

                return (
                  <div
                    key={day}
                    onClick={() => {
                      setActiveDay(day);
                      setScheduleViewMode('daily');
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isToday
                        ? 'bg-orange-50 border-orange-500 shadow-md ring-2 ring-orange-500/20 scale-102'
                        : 'bg-slate-50/80 border-slate-200 hover:border-orange-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-sm font-black text-slate-900">{day}</span>
                      {isToday && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="space-y-2.5 flex-1">
                      {activeScheduleSlots.map((slot) => {
                        const meta = getSlotMeta(slot);
                        const dishName = dayMenu[slot];

                        return (
                          <div key={slot} className={`p-2.5 rounded-xl border text-xs ${meta.cardBg} space-y-1`}>
                            <div className="flex items-center gap-1 font-black text-[11px] text-slate-900">
                              <span>{meta.icon}</span>
                              <span className="uppercase tracking-wider">{slot}</span>
                            </div>
                            <p className="font-bold text-slate-800 line-clamp-3 leading-snug">
                              {dishName}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* VIEW 2: DAY BY DAY SELECTOR VIEW */
            <div className="space-y-6">
              {/* Day Selector Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
                      activeDay === day
                        ? 'bg-gradient-to-r from-red-600 via-orange-500 to-green-600 text-white shadow-lg scale-105'
                        : 'bg-slate-100 text-slate-800 hover:bg-orange-100'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Active Day Menu Detailed Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeScheduleSlots.map((slot) => {
                  const meta = getSlotMeta(slot);
                  const dishName = WEEKLY_SUBSCRIPTION_MENU[activeDay][slot];

                  return (
                    <div key={slot} className={`p-6 rounded-2xl border-2 ${meta.cardBg} space-y-3 shadow-md`}>
                      <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${meta.badgeBg}`}>
                        {meta.icon} {meta.title}
                      </span>
                      <p className="text-lg font-black text-slate-900 pt-2 leading-relaxed">
                        {dishName}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-xs text-slate-600 font-bold border-t border-slate-200/60">
                        <span>Authentic Kovai Prep</span>
                        <span className="text-green-700 font-extrabold">✓ Fresh Delivery</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Subscription Booking Modal */}
      {isBookModalOpen && modalCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-orange-200 space-y-6 overflow-y-auto max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase text-red-600 tracking-wider bg-red-50 px-3 py-1 rounded-full">
                  Subscription Request
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif mt-1">
                  {modalCategory.name} ({modalDuration} Days Plan)
                </h3>
              </div>
              <button
                onClick={() => setIsBookModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-lg font-bold transition-all"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black shadow-lg">
                  ✓
                </div>
                <h4 className="text-2xl font-black text-slate-900 font-serif">Subscription Confirmed!</h4>
                <p className="text-sm font-semibold text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900">{userName || 'Valued Customer'}</strong>! Our CloudKitchen RS Puram delivery manager will call <strong className="text-slate-900">{userPhone}</strong> within 15 minutes to confirm your start date & preferred meal time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Plan Summary Box */}
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-2 text-xs font-bold text-slate-800">
                  <div className="flex justify-between items-center text-slate-900">
                    <span>Plan Duration:</span>
                    <span className="font-black text-sm">{modalDuration} Days</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-900">
                    <span>Meal Slots:</span>
                    <span className="font-black">{modalCategory.slotLabels.join(' + ')}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-900 border-t border-orange-200 pt-2 text-sm">
                    <span className="font-black">Total Payable:</span>
                    <span className="font-black text-red-600 text-base">
                      ₹{modalCategory.durations[modalDuration]?.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Karthik Subramaniam"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">Delivery Address (Coimbatore) *</label>
                  <textarea
                    required
                    rows="2"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    placeholder="Door No, Street name, Area (e.g. RS Puram, Peelamedu, Saravanampatti)"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" /> Confirm & Activate Subscription
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
