import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  UserCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  Flame,
  Sparkles,
  Tag,
  Clock,
  Radio,
  ShoppingBag,
  Percent,
  Search,
  Zap,
  DollarSign
} from 'lucide-react';

export default function AdminModal() {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    dishes, 
    orders, 
    toggleSoldOut, 
    addOrUpdateDish, 
    deleteDish,
    updateOrderStatus,
    isFestiveMode,
    setIsFestiveMode,
    festiveConfig,
    setFestiveConfig,
    kitchenStatus,
    setKitchenStatus,
    liveStatusMessage,
    setLiveStatusMessage,
    cutoffSeconds,
    resetCutoffTimer
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState('dishes'); // 'dishes', 'new-dish', 'festive', 'live-status', 'orders'
  const [dishSearchQuery, setDishSearchQuery] = useState('');

  // Editable Festival Config State
  const [localFestiveTitle, setLocalFestiveTitle] = useState(festiveConfig.title);
  const [localFestiveMsg, setLocalFestiveMsg] = useState(festiveConfig.message);
  const [localFestiveDiscount, setLocalFestiveDiscount] = useState(festiveConfig.discountPercent);

  // Editable Live Status State
  const [localLiveMsg, setLocalLiveMsg] = useState(liveStatusMessage);

  // New / Edit Dish Form State
  const [newDishForm, setNewDishForm] = useState({
    id: '',
    name: '',
    category: 'lunch',
    type: 'veg',
    price: 199,
    originalPrice: 249,
    offerBadge: '15% OFF',
    spiceLevel: 2,
    calories: 450,
    protein: '20g',
    carbs: '50g',
    fat: '15g',
    prepTime: '20 mins',
    description: '',
    ingredients: 'Fresh Paneer, Spices, Ghee',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    isSoldOut: false,
    rating: 4.8,
    reviewsCount: 12
  });

  if (!isAdminOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Passcode! Try "admin123"');
    }
  };

  const handleSaveDish = (e) => {
    e.preventDefault();
    const dishToSave = {
      ...newDishForm,
      id: newDishForm.id || `dish-${Date.now()}`,
      price: Number(newDishForm.price),
      originalPrice: newDishForm.originalPrice ? Number(newDishForm.originalPrice) : null,
      ingredients: typeof newDishForm.ingredients === 'string' 
        ? newDishForm.ingredients.split(',').map((s) => s.trim()) 
        : newDishForm.ingredients
    };

    addOrUpdateDish(dishToSave);
    setActiveTab('dishes');
    alert('Dish saved successfully!');
  };

  const handleSaveFestiveSettings = (e) => {
    e.preventDefault();
    setFestiveConfig({
      title: localFestiveTitle,
      message: localFestiveMsg,
      discountPercent: Number(localFestiveDiscount)
    });
    alert('Festival Sale settings updated successfully!');
  };

  const handleSaveLiveStatus = (e) => {
    e.preventDefault();
    setLiveStatusMessage(localLiveMsg);
    alert('Kitchen Live Status message updated!');
  };

  const formatTimeRemaining = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredDishes = dishes.filter((d) => 
    d.name.toLowerCase().includes(dishSearchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(dishSearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-black font-serif">CloudKitchen Admin Dashboard</h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-green-600 text-white px-2 py-0.5 rounded-full">
                  Live Control
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">Manage Products, Offers, Prices, Festival Sales & Live Status</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900 font-serif">Protected Admin Portal</h4>
              <p className="text-xs text-slate-500 font-medium mt-1">Enter passcode to access product pricing, festival sale & kitchen status</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Passcode (default: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-center font-mono font-black text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-xl transition-all active:scale-95"
              >
                Access Admin Dashboard →
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Main Content */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Nav Tabs Switcher */}
            <div className="flex items-center gap-1.5 sm:gap-2 pb-3 border-b border-slate-200 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('dishes')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'dishes' 
                    ? 'bg-slate-950 text-yellow-300 shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-orange-100'
                }`}
              >
                <Tag className="w-4 h-4 text-orange-500" />
                Products & Prices ({dishes.length})
              </button>

              <button
                onClick={() => setActiveTab('festive')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'festive' 
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md' 
                    : 'bg-yellow-100 text-yellow-900 border border-yellow-300 hover:bg-yellow-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
                Offers & Festival Sale {isFestiveMode && '• ON'}
              </button>

              <button
                onClick={() => setActiveTab('live-status')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'live-status' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                Live Status ({kitchenStatus})
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'orders' 
                    ? 'bg-slate-950 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-orange-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                Live Orders ({orders.length})
              </button>

              <button
                onClick={() => {
                  setNewDishForm({
                    id: '',
                    name: '',
                    category: 'lunch',
                    type: 'veg',
                    price: 199,
                    originalPrice: 249,
                    offerBadge: '15% OFF',
                    spiceLevel: 2,
                    calories: 450,
                    protein: '20g',
                    carbs: '50g',
                    fat: '15g',
                    prepTime: '20 mins',
                    description: '',
                    ingredients: 'Fresh Paneer, Spices, Ghee',
                    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
                    isSoldOut: false,
                    rating: 4.8,
                    reviewsCount: 12
                  });
                  setActiveTab('new-dish');
                }}
                className="ml-auto px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-xs sm:text-sm font-black rounded-xl flex items-center gap-1.5 shadow-md whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            {/* TAB 1: PRODUCTS & PRICE MANAGEMENT */}
            {activeTab === 'dishes' && (
              <div className="space-y-4">
                {/* Search & Filter Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search product by name or category..."
                      value={dishSearchQuery}
                      onChange={(e) => setDishSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <span className="text-xs text-slate-600 font-extrabold">
                    Showing {filteredDishes.length} of {dishes.length} items
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs font-medium text-slate-800">
                    <thead className="bg-slate-900 text-white font-black uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-3.5">Product</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Selling Price (₹)</th>
                        <th className="p-3.5">Original Price (₹)</th>
                        <th className="p-3.5">Offer Badge</th>
                        <th className="p-3.5">Stock Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredDishes.map((d) => (
                        <tr key={d.id} className="hover:bg-orange-50/50 transition-colors">
                          <td className="p-3 flex items-center gap-3">
                            <img src={d.image} alt={d.name} className="w-11 h-11 rounded-xl object-cover border border-slate-200" />
                            <div>
                              <span className="font-black text-slate-900 block text-xs">{d.name}</span>
                              <span className={`text-[9px] font-black uppercase px-2 py-0.2 rounded-full inline-block mt-0.5 ${
                                d.type === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {d.type}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 uppercase font-extrabold text-slate-600">{d.category}</td>
                          <td className="p-3 font-black text-slate-900 text-sm">₹{d.price}</td>
                          <td className="p-3 text-slate-400 font-bold line-through">
                            {d.originalPrice ? `₹${d.originalPrice}` : '-'}
                          </td>
                          <td className="p-3">
                            {d.offerBadge ? (
                              <span className="bg-orange-100 text-orange-800 font-black px-2.5 py-1 rounded-md text-[10px]">
                                {d.offerBadge}
                              </span>
                            ) : (
                              <span className="text-slate-400 font-bold">-</span>
                            )}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleSoldOut(d.id)}
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-xs transition-all ${
                                d.isSoldOut ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              }`}
                            >
                              {d.isSoldOut ? 'Sold Out' : 'Available'}
                            </button>
                          </td>
                          <td className="p-3 text-right space-x-1.5">
                            <button
                              onClick={() => {
                                setNewDishForm(d);
                                setActiveTab('new-dish');
                              }}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black rounded-lg transition-colors inline-flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-orange-600" /> Edit
                            </button>
                            <button
                              onClick={() => deleteDish(d.id)}
                              className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-black rounded-lg transition-colors inline-flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: OFFERS & FESTIVAL SALE CONTROL */}
            {activeTab === 'festive' && (
              <div className="space-y-6">
                
                {/* Festival Mode Switch Banner */}
                <div className={`p-6 rounded-3xl border-2 transition-all space-y-4 ${
                  isFestiveMode 
                    ? 'bg-gradient-to-r from-red-950 via-amber-950 to-orange-950 text-white border-yellow-400 shadow-xl' 
                    : 'bg-slate-50 text-slate-900 border-slate-300'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-yellow-400 animate-spin-slow" />
                        <h3 className="text-xl font-black font-serif">Global Festival Sale Banner</h3>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">
                        Toggle to activate festive theme banners, special discounts, and Kovai festival sales across the entire website.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsFestiveMode(!isFestiveMode)}
                      className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                        isFestiveMode 
                          ? 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 border border-yellow-500 scale-105' 
                          : 'bg-slate-950 hover:bg-slate-900 text-white'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      Festival Mode: {isFestiveMode ? 'ACTIVE (ON)' : 'DISABLED (OFF)'}
                    </button>
                  </div>
                </div>

                {/* Festival Configuration Form */}
                <form onSubmit={handleSaveFestiveSettings} className="bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-xl space-y-5">
                  <h4 className="text-base font-black text-slate-900 font-serif border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Percent className="w-5 h-5 text-red-600" /> Configure Festival Offer Banner & Discount
                  </h4>

                  <div className="space-y-4 max-w-2xl">
                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase mb-1.5">Festival Sale Banner Title *</label>
                      <input
                        type="text"
                        required
                        value={localFestiveTitle}
                        onChange={(e) => setLocalFestiveTitle(e.target.value)}
                        placeholder="e.g. 🌾 Kovai Pongal Festival Special Sale"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase mb-1.5">Banner Announcement Message *</label>
                      <textarea
                        rows={2}
                        required
                        value={localFestiveMsg}
                        onChange={(e) => setLocalFestiveMsg(e.target.value)}
                        placeholder="e.g. Get extra 15% OFF on all authentic Kovai Home Sappadu meal combos today!"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase mb-1.5">Global Festival Discount Percentage (%) *</label>
                      <input
                        type="number"
                        min={5}
                        max={50}
                        required
                        value={localFestiveDiscount}
                        onChange={(e) => setLocalFestiveDiscount(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3.5 bg-gradient-to-r from-red-600 via-orange-500 to-green-600 hover:opacity-90 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all"
                    >
                      Save Festival Offer Settings
                    </button>
                  </div>
                </form>

                {/* Promo Codes Summary */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Active Promo Coupons in Store:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-xs font-mono font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-md inline-block">HOMEFOOD10</span>
                      <p className="text-xs font-extrabold text-slate-800">10% OFF on all orders</p>
                    </div>
                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-xs font-mono font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md inline-block">FIRSTBUY</span>
                      <p className="text-xs font-extrabold text-slate-800">15% OFF First Order Special</p>
                    </div>
                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-xs font-mono font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-md inline-block">FESTIVE20</span>
                      <p className="text-xs font-extrabold text-slate-800">20% OFF Festival Sappadu</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: LIVE KITCHEN STATUS CONTROL */}
            {activeTab === 'live-status' && (
              <div className="space-y-6 max-w-3xl mx-auto">
                
                {/* Kitchen Status Selector */}
                <div className="bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-xl space-y-5">
                  <h4 className="text-base font-black text-slate-900 font-serif border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Radio className="w-5 h-5 text-emerald-600" /> Kitchen Operational Status
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { status: 'Open', label: '🟢 Kitchen Open (Taking Orders)', desc: 'Accepting instant doorstep orders', color: 'border-green-500 bg-green-50 text-green-950' },
                      { status: 'Busy', label: '🟡 Busy (Pre-Orders Only)', desc: 'High demand - pre-orders active', color: 'border-yellow-500 bg-yellow-50 text-yellow-950' },
                      { status: 'Closed', label: '🔴 Kitchen Closed', desc: 'Closed for today', color: 'border-red-500 bg-red-50 text-red-950' },
                    ].map((item) => (
                      <button
                        key={item.status}
                        type="button"
                        onClick={() => setKitchenStatus(item.status)}
                        className={`p-4 rounded-2xl border-2 text-left space-y-1 transition-all ${
                          kitchenStatus === item.status ? `${item.color} shadow-lg scale-102 font-black` : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="text-xs font-black block">{item.label}</span>
                        <span className="text-[11px] font-medium text-slate-500 block">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Announcement Message Form */}
                <form onSubmit={handleSaveLiveStatus} className="bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-xl space-y-4">
                  <h4 className="text-base font-black text-slate-900 font-serif border-b border-slate-100 pb-3">
                    Live Cooking Announcement Message
                  </h4>

                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase mb-1.5">Live Ticker / Status Message *</label>
                    <input
                      type="text"
                      required
                      value={localLiveMsg}
                      onChange={(e) => setLocalLiveMsg(e.target.value)}
                      placeholder="e.g. 🔥 Live Cooking Active in RS Puram Home Kitchen Hub"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md"
                  >
                    Update Live Status Message
                  </button>
                </form>

                {/* Cut-off Timer Manager */}
                <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-yellow-400 font-black uppercase tracking-wider block">Lunch Pre-Order Countdown</span>
                      <h4 className="text-xl font-black font-serif">Time Remaining: {formatTimeRemaining(cutoffSeconds)}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => resetCutoffTimer(2)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black rounded-xl"
                      >
                        Reset 2 Hrs
                      </button>
                      <button
                        onClick={() => resetCutoffTimer(3)}
                        className="px-3 py-1.5 bg-yellow-400 text-slate-950 text-xs font-black rounded-xl hover:bg-yellow-300"
                      >
                        Reset 3 Hrs
                      </button>
                      <button
                        onClick={() => resetCutoffTimer(4)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-black rounded-xl"
                      >
                        Reset 4 Hrs
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: LIVE ORDERS MONITOR */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs font-extrabold">
                    No incoming orders yet.
                  </div>
                ) : (
                  orders.map((o) => (
                    <div key={o.id} className="p-5 bg-white rounded-3xl border-2 border-orange-100 shadow-md space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black font-mono text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md">
                              {o.id}
                            </span>
                            <span className="text-xs font-bold text-slate-500">Placed at {o.placedAt || 'Just now'}</span>
                          </div>
                          <h4 className="text-base font-black text-slate-900 mt-1">{o.customerName} ({o.phone})</h4>
                          <p className="text-xs text-slate-600 font-semibold">{o.address}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div>
                            <span className="text-lg font-black text-slate-900 block">₹{o.totalAmount}</span>
                            <span className="text-[10px] text-green-700 font-extrabold uppercase">{o.paymentMethod || 'Paid'}</span>
                          </div>
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-300 text-xs font-black text-slate-900 focus:outline-none"
                          >
                            <option value="Received">📥 Order Received</option>
                            <option value="Cooking">👨‍🍳 Cooking in Kitchen</option>
                            <option value="Out for Delivery">🛵 Out for Delivery</option>
                            <option value="Delivered">✅ Delivered</option>
                          </select>
                        </div>
                      </div>

                      {/* Items List inside Order */}
                      <div className="flex flex-wrap gap-2 text-xs font-extrabold">
                        {o.items?.map((it, idx) => (
                          <span key={idx} className="bg-yellow-50 text-slate-950 px-3 py-1 rounded-xl border border-yellow-200">
                            {it.quantity}x {it.name} (₹{it.price})
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 5: ADD / EDIT PRODUCT FORM */}
            {activeTab === 'new-dish' && (
              <form onSubmit={handleSaveDish} className="space-y-4 max-w-2xl mx-auto bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-xl">
                <h4 className="text-base font-black text-slate-900 font-serif border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-red-600" /> {newDishForm.id ? 'Edit Product Details' : 'Add New Product to Store'}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={newDishForm.name}
                      onChange={(e) => setNewDishForm({ ...newDishForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase mb-1">Category *</label>
                    <select
                      value={newDishForm.category}
                      onChange={(e) => setNewDishForm({ ...newDishForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch Box</option>
                      <option value="dinner">Dinner Special</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newDishForm.price}
                      onChange={(e) => setNewDishForm({ ...newDishForm, price: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={newDishForm.originalPrice || ''}
                      onChange={(e) => setNewDishForm({ ...newDishForm, originalPrice: e.target.value })}
                      placeholder="e.g. 249"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase mb-1">Offer Tag / Badge</label>
                    <input
                      type="text"
                      value={newDishForm.offerBadge || ''}
                      onChange={(e) => setNewDishForm({ ...newDishForm, offerBadge: e.target.value })}
                      placeholder="e.g. 15% OFF"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase mb-1">Diet Type</label>
                    <select
                      value={newDishForm.type}
                      onChange={(e) => setNewDishForm({ ...newDishForm, type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="veg">Veg</option>
                      <option value="non-veg">Non-Veg</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase mb-1">Spice Level (1-4)</label>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      value={newDishForm.spiceLevel}
                      onChange={(e) => setNewDishForm({ ...newDishForm, spiceLevel: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase mb-1">Preparation Time</label>
                    <input
                      type="text"
                      value={newDishForm.prepTime}
                      onChange={(e) => setNewDishForm({ ...newDishForm, prepTime: e.target.value })}
                      placeholder="e.g. 20 mins"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newDishForm.description}
                    onChange={(e) => setNewDishForm({ ...newDishForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 uppercase mb-1">Product Image URL</label>
                  <input
                    type="text"
                    value={newDishForm.image}
                    onChange={(e) => setNewDishForm({ ...newDishForm, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('dishes')}
                    className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-gradient-to-r from-red-600 via-orange-500 to-green-600 text-white font-black text-xs rounded-xl shadow-lg hover:opacity-90 transition-all"
                  >
                    Save Product to Store
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
