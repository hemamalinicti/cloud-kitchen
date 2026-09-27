import React from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Eye, Check, ShieldAlert } from 'lucide-react';

export default function DishCard({ dish, onClick, simple = false }) {
  const { addToCart, cart, setSelectedDishDetail, kitchenStatus } = useApp();
  const isClosed = kitchenStatus?.toLowerCase() === 'closed';

  const cartItem = cart.find((item) => item.dishId === dish.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(dish, 1);
  };

  const handleCardClick = (e) => {
    if (onClick) {
      e?.stopPropagation();
      onClick(dish);
    } else {
      setSelectedDishDetail(dish);
    }
  };

  if (simple) {
    return (
      <div 
        onClick={handleCardClick}
        className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-orange-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 cursor-pointer"
      >
        {/* Top Image Container */}
        <div className="relative h-36 sm:h-52 md:h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Hover Action Banner */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
            <span className="bg-yellow-400 text-slate-950 font-black text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-1.5 group-hover:scale-105 transition-transform">
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" /> View Menu →
            </span>
          </div>
        </div>

        {/* Card Title Only */}
        <div className="p-3 sm:p-5 text-center bg-white flex items-center justify-center min-h-[52px] sm:min-h-[72px]">
          <h3 className="text-xs sm:text-lg font-black text-slate-900 font-serif group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
            {dish.name}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative h-32 sm:h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-50" />

        {/* Veg/Non-Veg Dot Badge */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md shadow-xs flex items-center gap-1 border border-slate-200/80">
          <div className={`w-2.5 h-2.5 border flex items-center justify-center ${
            dish.type === 'veg' ? 'border-green-600' : 'border-red-600'
          }`}>
            <div className={`w-1 h-1 rounded-full ${
              dish.type === 'veg' ? 'bg-green-600' : 'bg-red-600'
            }`} />
          </div>
          <span className={`text-[9px] sm:text-[10px] font-black uppercase ${
            dish.type === 'veg' ? 'text-green-700' : 'text-red-700'
          }`}>
            {dish.type}
          </span>
        </div>

        {/* Today Special Badge */}
        {dish.isTodaySpecial && (
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
            Special
          </div>
        )}

        {/* Quick View Button Badge on Image */}
        <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5">
          <span className="bg-slate-950/80 hover:bg-slate-950 text-white text-[9px] sm:text-xs font-black px-2 py-1 rounded-lg backdrop-blur-md shadow-md flex items-center gap-1 border border-white/20">
            <Eye className="w-3 h-3 text-yellow-400" /> Quick View
          </span>
        </div>

        {/* Sold Out Overlay */}
        {dish.isSoldOut && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white p-2 text-center">
            <ShieldAlert className="w-6 h-6 text-red-400 mb-0.5" />
            <span className="text-xs font-black uppercase text-red-400">Sold Out</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Dish Name */}
          <h3 
            onClick={handleCardClick}
            className="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors cursor-pointer"
          >
            {dish.name}
          </h3>

          {/* Short Description */}
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium line-clamp-1 mt-0.5 leading-tight">
            {dish.description}
          </p>
        </div>

        {/* Bottom Price & Add Button Row */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-base font-black text-slate-900">₹{dish.price}</span>
              {dish.originalPrice && (
                <span className="text-[9px] sm:text-xs font-bold text-slate-400 line-through">
                  ₹{dish.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[8px] sm:text-[9px] text-green-700 font-extrabold block">Incl. taxes</span>
          </div>

          {dish.isSoldOut ? (
            <button
              disabled
              className="px-2 py-1 bg-slate-200 text-slate-400 text-[10px] font-bold rounded-lg cursor-not-allowed"
            >
              Sold Out
            </button>
          ) : isClosed ? (
            <button
              disabled
              className="px-2 py-1 bg-red-100 border border-red-300 text-red-700 text-[10px] font-black rounded-lg cursor-not-allowed"
            >
              Closed
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 active:scale-95 shadow-xs ${
                qtyInCart > 0
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
              }`}
            >
              {qtyInCart > 0 ? (
                <>
                  <Check className="w-3 h-3" /> ({qtyInCart})
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" /> Add
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
