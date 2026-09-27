import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Box, Check, Plus, ShoppingBag, Sparkles, ChefHat } from 'lucide-react';

export default function TiffinBuilderModal() {
  const { isTiffinBuilderOpen, setIsTiffinBuilderOpen, addToCart, kitchenStatus } = useApp();
  const isClosed = kitchenStatus?.toLowerCase() === 'closed';

  // Selection states
  const [selectedMain, setSelectedMain] = useState({ name: 'Coimbatore Drumstick Sambar & Poriyal (Veg)', price: 75, calories: 190 });
  const [selectedSides, setSelectedSides] = useState([
    { name: 'Pepper Garlic Rasam Bowl', price: 35, calories: 80 },
    { name: 'Vazhaipoo (Banana Flower) Poriyal', price: 40, calories: 95 }
  ]);
  const [selectedBread, setSelectedBread] = useState({ name: '2 Hot Malabar Parottas', price: 40, calories: 260 });
  const [selectedSweet, setSelectedSweet] = useState({ name: 'Chilled Madurai Jigarthanda', price: 45, calories: 150 });

  if (!isTiffinBuilderOpen) return null;

  // Options Data
  const mainsList = [
    { name: 'Chettinad Kozhi Kuzhambu (Non-Veg)', price: 110, calories: 290, type: 'non-veg' },
    { name: 'Kongu Nattu Kozhi Masala (Non-Veg)', price: 115, calories: 310, type: 'non-veg' },
    { name: 'Madurai Mutton Chukka (Non-Veg)', price: 140, calories: 340, type: 'non-veg' },
    { name: 'Karaikudi Ennai Kathirikai Kuzhambu (Veg)', price: 85, calories: 210, type: 'veg' },
    { name: 'Coimbatore Drumstick Sambar & Poriyal (Veg)', price: 75, calories: 190, type: 'veg' },
  ];

  const sidesList = [
    { name: 'Pepper Garlic Rasam Bowl', price: 35, calories: 80 },
    { name: 'Vazhaipoo (Banana Flower) Poriyal', price: 40, calories: 95 },
    { name: 'Pasalai Keerai Kootu (Spinach Dal)', price: 35, calories: 105 },
    { name: 'Kovai Curd Rice with Mango Pickle', price: 45, calories: 180 },
  ];

  const breadsList = [
    { name: '2 Hot Malabar Parottas', price: 40, calories: 260 },
    { name: '3 Desi Ghee Soft Idlis', price: 35, calories: 160 },
    { name: 'Steamed Tamil Ponni Boiled Rice', price: 35, calories: 210 },
    { name: '2 Wheat Chapattis', price: 30, calories: 140 },
  ];

  const sweetsList = [
    { name: 'Chilled Madurai Jigarthanda', price: 45, calories: 150 },
    { name: 'Tirunelveli Ghee Wheat Halwa', price: 35, calories: 140 },
    { name: 'Elaneer (Tender Coconut) Payasam', price: 40, calories: 120 },
    { name: 'Kumbakonam Degree Filter Coffee', price: 30, calories: 60 },
  ];

  // Calculated totals
  const totalBasePrice = selectedMain.price + selectedSides.reduce((s, item) => s + item.price, 0) + selectedBread.price + selectedSweet.price;
  const totalCalories = selectedMain.calories + selectedSides.reduce((s, item) => s + item.calories, 0) + selectedBread.calories + selectedSweet.calories;

  const toggleSide = (sideItem) => {
    const exists = selectedSides.some((s) => s.name === sideItem.name);
    if (exists) {
      setSelectedSides(selectedSides.filter((s) => s.name !== sideItem.name));
    } else {
      if (selectedSides.length < 2) {
        setSelectedSides([...selectedSides, sideItem]);
      }
    }
  };

  const handleAddTiffinToCart = () => {
    const customTiffinDish = {
      id: 'custom-tiffin-box',
      name: 'Custom Built Tiffin Box',
      price: totalBasePrice,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      type: selectedMain.type || 'veg',
    };

    const detailsSummary = `Main: ${selectedMain.name} | Sides: ${selectedSides.map(s => s.name).join(', ')} | Breads: ${selectedBread.name} | Sweet: ${selectedSweet.name}`;
    
    addToCart(customTiffinDish, 1, `Custom Tiffin Box (${detailsSummary})`, totalBasePrice);
    setIsTiffinBuilderOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-600 to-brand-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Box className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold font-serif">Build Your Own Custom Tiffin Box</h3>
              <p className="text-xs text-amber-100">Pick 1 Main + 2 Sides + 1 Bread + 1 Sweet/Drink</p>
            </div>
          </div>
          <button
            onClick={() => setIsTiffinBuilderOpen(false)}
            className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Selector Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Step 1: Select Main Curry */}
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5">
              1. Choose Main Gravy / Curry
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {mainsList.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setSelectedMain(m)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                    selectedMain.name === m.name
                      ? 'border-brand-500 bg-brand-50/80 text-brand-950 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>
                    <span className="block">{m.name}</span>
                    <span className="text-[10px] text-slate-500 font-normal">+{m.calories} kcal</span>
                  </div>
                  <span className="font-extrabold text-brand-600">₹{m.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select 2 Sides */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                2. Select Any 2 Sides (Selected: {selectedSides.length}/2)
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sidesList.map((s) => {
                const isSelected = selectedSides.some((item) => item.name === s.name);
                return (
                  <button
                    key={s.name}
                    onClick={() => toggleSide(s)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="block">{s.name}</span>
                      <span className="text-[10px] text-slate-500 font-normal">+{s.calories} kcal</span>
                    </div>
                    <span className="font-extrabold text-amber-700">₹{s.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Select Breads */}
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5">
              3. Choose Bread / Rice Base
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {breadsList.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setSelectedBread(b)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between text-xs font-bold transition-all ${
                    selectedBread.name === b.name
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="block">{b.name}</span>
                  <span className="text-emerald-700 font-black mt-1">₹{b.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Sweet / Beverage */}
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5">
              4. Add Dessert or Refreshment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {sweetsList.map((sw) => (
                <button
                  key={sw.name}
                  onClick={() => setSelectedSweet(sw)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between text-xs font-bold transition-all ${
                    selectedSweet.name === sw.name
                      ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="block">{sw.name}</span>
                  <span className="text-purple-700 font-black mt-1">₹{sw.price}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Summary & Add to Cart */}
        <div className="p-4 bg-amber-50 text-slate-900 border-t-2 border-amber-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-600 font-bold block">Total Box Calories: ~{totalCalories} kcal</span>
            <span className="text-2xl font-black text-red-600">₹{totalBasePrice}</span>
          </div>

          {isClosed ? (
            <button
              disabled
              className="px-6 py-3.5 bg-red-100 text-red-700 border border-red-300 rounded-2xl font-black text-xs sm:text-sm cursor-not-allowed"
            >
              🚫 Kitchen Closed — Orders Disabled
            </button>
          ) : (
            <button
              onClick={handleAddTiffinToCart}
              disabled={selectedSides.length < 2}
              className={`px-6 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all ${
                selectedSides.length < 2
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/30 active:scale-95'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Add Custom Tiffin to Cart
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
