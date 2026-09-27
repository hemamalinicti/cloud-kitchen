import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Flame, Star, Clock, ChefHat, Check, Plus, Minus, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function DishDetailModal() {
  const { selectedDishDetail, setSelectedDishDetail, addToCart, kitchenStatus } = useApp();
  const isClosed = kitchenStatus?.toLowerCase() === 'closed';
  const [qty, setQty] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');
  const [selectedSpice, setSelectedSpice] = useState(selectedDishDetail?.spiceLevel || 2);

  if (!selectedDishDetail) return null;

  const dish = selectedDishDetail;
  const totalPrice = dish.price * qty;

  const spiceOptions = [
    { lvl: 1, label: 'Mild', desc: 'Light & gentle spice', color: 'border-emerald-300 bg-emerald-50 text-emerald-900', flames: 'text-emerald-500 fill-emerald-500' },
    { lvl: 2, label: 'Medium', desc: 'Balanced home spice', color: 'border-yellow-300 bg-yellow-50 text-yellow-900', flames: 'text-yellow-500 fill-yellow-500' },
    { lvl: 3, label: 'Spicy', desc: 'Authentic Kovai Kovil spice', color: 'border-orange-300 bg-orange-50 text-orange-900', flames: 'text-orange-600 fill-orange-600' },
    { lvl: 4, label: 'Extra Hot', desc: 'Fiery Chettinad pepper hot', color: 'border-red-400 bg-red-50 text-red-900', flames: 'text-red-600 fill-red-600' },
  ];

  const handleAddToCart = () => {
    const note = specialNotes.trim() ? `(${specialNotes.trim()})` : null;
    addToCart(dish, qty, note ? `${dish.name} ${note}` : null, null, selectedSpice);
    setSelectedDishDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDishDetail(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Top Hero Image */}
          <div className="relative h-64 -mx-6 -mt-6 bg-slate-100 overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <span className={`inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mb-1 ${
                  dish.type === 'veg' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  100% {dish.type}
                </span>
                <h2 className="text-2xl font-extrabold font-serif">{dish.name}</h2>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-amber-400">₹{dish.price}</span>
              </div>
            </div>
          </div>

          {/* Description & Prep Time */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {dish.rating} Rating ({dish.reviewsCount} reviews)
              </span>
              <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Cooked in {dish.prepTime}
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {dish.description}
            </p>
          </div>

          {/* Chef Attribution */}
          {dish.chef && (
            <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/60 flex items-center gap-3">
              <img
                src={dish.chefAvatar}
                alt={dish.chef}
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-amber-400 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-brand-600" />
                  <span className="text-xs font-bold text-slate-900">Prepared by {dish.chef}</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Authentic home recipe with fresh A2 Ghee & ground spices</span>
              </div>
            </div>
          )}

          {/* Nutrition Table */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Nutritional Values</h4>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="block font-bold text-slate-900 text-sm">{dish.calories}</span>
                <span className="text-[10px] text-slate-500">Calories</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="block font-bold text-slate-900 text-sm">{dish.protein}</span>
                <span className="text-[10px] text-slate-500">Protein</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="block font-bold text-slate-900 text-sm">{dish.carbs}</span>
                <span className="text-[10px] text-slate-500">Carbs</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="block font-bold text-slate-900 text-sm">{dish.fat}</span>
                <span className="text-[10px] text-slate-500">Healthy Fat</span>
              </div>
            </div>
          </div>

          {/* Interactive Manual Spice Meter Adjuster */}
          <div className="p-4 bg-orange-50/80 rounded-2xl border border-orange-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-red-100 rounded-xl text-red-600">
                  <Flame className="w-5 h-5 fill-red-600 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Customize Spice Level Meter</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Select your preferred spice level for kitchen preparation</p>
                </div>
              </div>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-red-600 text-white shadow-sm font-mono">
                Level {selectedSpice} / 4
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {spiceOptions.map((opt) => (
                <button
                  key={opt.lvl}
                  type="button"
                  onClick={() => setSelectedSpice(opt.lvl)}
                  className={`p-3 rounded-2xl border-2 font-bold text-left transition-all flex flex-col justify-between ${
                    selectedSpice === opt.lvl
                      ? 'border-red-600 bg-white text-slate-900 shadow-md ring-2 ring-red-500/30'
                      : 'border-slate-200 bg-white/60 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black">{opt.label}</span>
                    <div className="flex">
                      {Array.from({ length: opt.lvl }).map((_, i) => (
                        <Flame key={i} className={`w-3 h-3 ${opt.flames}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Key Ingredients */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Ingredients</h4>
            <div className="flex flex-wrap gap-1.5">
              {dish.ingredients.map((ing, idx) => (
                <span key={idx} className="bg-amber-100/70 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-lg">
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Special Cooking Instructions */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1">
              Custom Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Less oil, medium spicy, separate chutney"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

        </div>

        {/* Modal Footer with Qty & Add Button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center bg-white rounded-2xl border border-slate-300 p-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 font-bold"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 font-extrabold text-sm text-slate-900">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 font-bold"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {isClosed ? (
            <button
              disabled
              className="flex-1 py-3.5 bg-red-100 text-red-700 border border-red-300 font-black text-xs sm:text-sm rounded-2xl cursor-not-allowed text-center"
            >
              🚫 Kitchen Closed — Orders Disabled
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart — ₹{totalPrice}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
