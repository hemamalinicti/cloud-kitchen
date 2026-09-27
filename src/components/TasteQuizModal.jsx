import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, CheckCircle2, Flame, Utensils, ArrowRight, RefreshCw } from 'lucide-react';

export default function TasteQuizModal() {
  const { isTasteQuizOpen, setIsTasteQuizOpen, dishes, addToCart } = useApp();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    type: 'veg',
    spice: 2,
    mealCategory: 'lunch'
  });

  const [recommendation, setRecommendation] = useState(null);

  if (!isTasteQuizOpen) return null;

  const handleSelectType = (val) => {
    setAnswers((prev) => ({ ...prev, type: val }));
  };

  const handleSelectSpice = (val) => {
    setAnswers((prev) => ({ ...prev, spice: val }));
  };

  const handleSelectMeal = (val) => {
    setAnswers((prev) => ({ ...prev, mealCategory: val }));
  };

  const findRecommendation = () => {
    const matched = dishes.find(
      (d) => d.type === answers.type && d.category === answers.mealCategory
    ) || dishes.find((d) => d.type === answers.type) || dishes[0];

    setRecommendation(matched);
    setStep(4); // Show result step
  };

  const handleReset = () => {
    setStep(1);
    setRecommendation(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 border border-amber-100 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-serif">Taste Preference Quiz</h3>
              <p className="text-[11px] text-slate-500 font-medium">Find your perfect home-style meal match</p>
            </div>
          </div>
          <button
            onClick={() => setIsTasteQuizOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        {step <= 3 && (
          <div className="flex items-center justify-between gap-2 px-4 py-2 bg-amber-50 rounded-2xl border border-amber-100 text-xs font-bold text-amber-800">
            <span>Step {step} of 3</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-6 h-2 rounded-full transition-all ${
                    s <= step ? 'bg-brand-500' : 'bg-amber-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Diet Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800">1. What is your diet preference today?</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSelectType('veg')}
                className={`p-4 rounded-2xl border-2 font-bold text-sm text-left flex flex-col justify-between transition-all ${
                  answers.type === 'veg'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-xl mb-2">🥗</span>
                <span>100% Pure Veg</span>
                <span className="text-[10px] font-medium text-slate-500">Ghee Podi Idli, Arachivitta Sambar & Full Sappadu</span>
              </button>

              <button
                onClick={() => handleSelectType('non-veg')}
                className={`p-4 rounded-2xl border-2 font-bold text-sm text-left flex flex-col justify-between transition-all ${
                  answers.type === 'non-veg'
                    ? 'border-red-500 bg-red-50 text-red-950 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-xl mb-2">🍗</span>
                <span>Non-Veg Special</span>
                <span className="text-[10px] font-medium text-slate-500">Chicken, Mutton & Fish Curries</span>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Spice Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800">2. How spicy do you like your food?</h4>
            <div className="space-y-2">
              {[
                { level: 1, name: 'Mild & Comforting', desc: 'Light spices, low chillies, gentle on stomach', icon: '🌶️' },
                { level: 2, name: 'Balanced Home Spice', desc: 'Standard authentic home style spice level', icon: '🌶️🌶️' },
                { level: 3, name: 'Hot & Fiery Chettinad/Desi', desc: 'Bold pepper, roasted chillies, intense flavor', icon: '🌶️🌶️🌶️' },
              ].map((sp) => (
                <button
                  key={sp.level}
                  onClick={() => handleSelectSpice(sp.level)}
                  className={`w-full p-3.5 rounded-2xl border-2 font-bold text-xs text-left flex items-center justify-between transition-all ${
                    answers.spice === sp.level
                      ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{sp.icon}</span>
                      <span className="text-sm font-extrabold">{sp.name}</span>
                    </div>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">{sp.desc}</p>
                  </div>
                  {answers.spice === sp.level && <CheckCircle2 className="w-5 h-5 text-amber-600" />}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Meal Category */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800">3. What type of meal are you craving right now?</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'breakfast', label: 'Light Breakfast / Tiffin', icon: '🥞' },
                { id: 'lunch', label: 'Wholesome Thali / Meal Box', icon: '🍱' },
                { id: 'dinner', label: 'Royal Dinner Feast', icon: '🍲' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMeal(m.id)}
                  className={`p-3.5 rounded-2xl border-2 font-bold text-xs text-left transition-all ${
                    answers.mealCategory === m.id
                      ? 'border-brand-500 bg-brand-50 text-brand-950 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-2xl block mb-1">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Back
              </button>
              <button
                onClick={findRecommendation}
                className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Reveal My Match
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Result / Recommended Dish */}
        {step === 4 && recommendation && (
          <div className="space-y-4 text-center">
            <div className="inline-block p-3 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs">
              🎉 98% Taste Match Found!
            </div>

            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 text-left space-y-3">
              <img
                src={recommendation.image}
                alt={recommendation.name}
                className="w-full h-40 object-cover rounded-2xl"
              />
              <div className="flex items-center justify-between">
                <h4 className="text-base font-extrabold text-slate-900">{recommendation.name}</h4>
                <span className="text-base font-black text-brand-600">₹{recommendation.price}</span>
              </div>
              <p className="text-xs text-slate-600">{recommendation.description}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake
              </button>
              <button
                onClick={() => {
                  addToCart(recommendation);
                  setIsTasteQuizOpen(false);
                }}
                className="w-2/3 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-xl flex items-center justify-center gap-2"
              >
                Add Recommended Dish to Cart
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
