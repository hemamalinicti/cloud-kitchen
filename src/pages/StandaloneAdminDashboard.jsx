import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ChefHat, 
  Utensils, 
  Sparkles, 
  Radio, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Flame, 
  Clock, 
  DollarSign, 
  Lock, 
  Search, 
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Tag,
  ArrowRight,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function StandaloneAdminDashboard() {
  const { 
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
    resetCutoffTimer,
    user
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return user?.role === 'admin';
  });

  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState('dishes'); // 'dishes', 'new-dish', 'festive', 'live-status', 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [syncStatusMsg, setSyncStatusMsg] = useState('🟢 Synced with Customer Storefront (Port 5173)');

  // Form states
  const [festiveTitle, setFestiveTitle] = useState(festiveConfig.title);
  const [festiveMsg, setFestiveMsg] = useState(festiveConfig.message);
  const [festiveDiscount, setFestiveDiscount] = useState(festiveConfig.discountPercent);

  const [liveMsg, setLiveMsg] = useState(liveStatusMessage);

  const [editingDish, setEditingDish] = useState(null);
  const [dishForm, setDishForm] = useState({
    id: '',
    name: '',
    category: 'lunch',
    type: 'veg',
    price: 199,
    originalPrice: 249,
    offerBadge: '15% OFF',
    spiceLevel: 2,
    calories: 450,
    prepTime: '20 mins',
    description: '',
    ingredients: 'Fresh Paneer, Spices, Ghee',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    isSoldOut: false,
    rating: 4.8,
    reviewsCount: 15
  });

  // Cross-port sync via BroadcastChannel & postMessage Bridge
  const broadcastChange = (override = {}) => {
    const payload = {
      kitchenStatus: override.kitchenStatus !== undefined ? override.kitchenStatus : kitchenStatus,
      festiveMode: override.festiveMode !== undefined ? override.festiveMode : isFestiveMode,
      festiveConfig: override.festiveConfig !== undefined ? override.festiveConfig : festiveConfig,
      dishes: override.dishes !== undefined ? override.dishes : dishes,
      orders: override.orders !== undefined ? override.orders : orders,
      liveStatusMessage: override.liveStatusMessage !== undefined ? override.liveStatusMessage : liveStatusMessage
    };

    const msg = { type: 'CLOUDKITCHEN_ADMIN_SYNC', payload };

    // Post to iframe bridge on port 5173
    const iframe = document.getElementById('storefront-sync-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(msg, '*');
    }

    if (window.opener) {
      window.opener.postMessage(msg, '*');
    }

    try {
      const channel = new BroadcastChannel('cloudkitchen_channel');
      channel.postMessage(msg);
      channel.close();
    } catch (e) {}
  };

  useEffect(() => {
    broadcastChange();
  }, [kitchenStatus, isFestiveMode, festiveConfig, dishes, orders, liveStatusMessage]);

  const handlePasscodeLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'Cloud@456') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Passcode! Passcode is: Cloud@456 or admin123');
    }
  };

  const handleSaveFestive = (e) => {
    e.preventDefault();
    setFestiveConfig({
      title: festiveTitle,
      message: festiveMsg,
      discountPercent: Number(festiveDiscount)
    });
    broadcastChange();
    alert('✅ Festival Sale & Discount Settings Updated!');
  };

  const handleSaveLiveStatus = (e) => {
    e.preventDefault();
    setLiveStatusMessage(liveMsg);
    broadcastChange();
    alert('✅ Live Announcement Message Updated!');
  };

  const handleSaveDishSubmit = (e) => {
    e.preventDefault();
    if (!dishForm.name || !dishForm.price) {
      alert('Please enter dish name and price.');
      return;
    }

    const savedDish = {
      ...dishForm,
      id: dishForm.id || `dish-${Date.now()}`,
      price: Number(dishForm.price),
      originalPrice: dishForm.originalPrice ? Number(dishForm.originalPrice) : null,
      ingredients: typeof dishForm.ingredients === 'string' 
        ? dishForm.ingredients.split(',').map((s) => s.trim()) 
        : dishForm.ingredients
    };

    addOrUpdateDish(savedDish);
    broadcastChange();
    setActiveTab('dishes');
    setEditingDish(null);
    alert('✅ Dish updated successfully!');
  };

  const startEditDish = (dish) => {
    setDishForm({
      ...dish,
      ingredients: Array.isArray(dish.ingredients) ? dish.ingredients.join(', ') : dish.ingredients || ''
    });
    setEditingDish(dish.id);
    setActiveTab('new-dish');
  };

  const resetFormToNew = () => {
    setDishForm({
      id: '',
      name: '',
      category: 'lunch',
      type: 'veg',
      price: 199,
      originalPrice: 249,
      offerBadge: '15% OFF',
      spiceLevel: 2,
      calories: 450,
      prepTime: '20 mins',
      description: '',
      ingredients: 'Fresh Spices, Vegetables, Ghee',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
      isSoldOut: false,
      rating: 4.8,
      reviewsCount: 15
    });
    setEditingDish(null);
    setActiveTab('new-dish');
  };

  // Filtered dishes
  const filteredDishes = dishes.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'Delivered').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-amber-50/40 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-2 border-orange-200/90 rounded-3xl p-8 space-y-6 shadow-2xl">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider border border-yellow-400 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>Admin Security Portal</span>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <img src="/images/logo_icon.png" alt="Logo" className="h-10 w-auto" />
              <h1 className="text-2xl font-black font-serif text-slate-950">
                Cloud<span className="text-red-600">Kitchen</span> Admin
              </h1>
            </div>

            <p className="text-xs font-semibold text-slate-600">
              Admin Control Center running on <strong className="font-mono text-orange-600">http://localhost:5174</strong>
            </p>
          </div>

          <form onSubmit={handlePasscodeLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                Enter Admin Passcode *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter passcode (Cloud@456 or admin123)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 hover:from-red-700 hover:to-yellow-400 text-white font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              Unlock Admin Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs font-semibold text-slate-500">
            <span>Customer Website running live at: </span>
            <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="text-red-600 font-extrabold hover:underline font-mono">
              http://localhost:5173
            </a>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/30 text-slate-900 flex flex-col font-sans">
      
      {/* Top Header Navbar - Matching Website Theme */}
      <header className="bg-white/95 backdrop-blur-md border-b border-orange-200/80 sticky top-0 z-40 px-4 sm:px-8 py-3 shadow-md text-slate-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <img src="/images/logo_icon.png" alt="CloudKitchen" className="h-10 w-auto" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black font-serif tracking-tight text-slate-950">
                  Cloud<span className="text-red-600">Kitchen</span> <span className="text-xs font-sans text-orange-600 uppercase font-extrabold">Admin Server</span>
                </span>
                <span className="text-[10px] font-mono font-black bg-yellow-300 text-slate-950 border border-yellow-400 px-2 py-0.5 rounded-md shadow-xs">
                  PORT 5174
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-extrabold flex items-center gap-1.5">
                <span>{syncStatusMsg}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="hidden lg:flex items-center gap-4 bg-amber-50 px-4 py-2 rounded-2xl border border-orange-200/80 text-xs font-black shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase text-[10px]">Kitchen Status:</span>
              <span className={`px-2.5 py-0.5 rounded-full border text-xs ${
                kitchenStatus === 'Open' 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                  : kitchenStatus === 'Busy' 
                  ? 'bg-yellow-100 text-yellow-900 border-yellow-300' 
                  : 'bg-red-100 text-red-900 border-red-300'
              }`}>
                ● {kitchenStatus}
              </span>
            </div>

            <div className="h-5 w-px bg-orange-200" />

            <div>
              <span className="text-slate-500 uppercase text-[10px] mr-1">Active Orders:</span>
              <span className="text-red-600 font-mono text-sm">{activeOrdersCount} Live</span>
            </div>

            <div className="h-5 w-px bg-orange-200" />

            <div>
              <span className="text-slate-500 uppercase text-[10px] mr-1">Total Revenue:</span>
              <span className="text-emerald-700 font-mono text-sm">₹{totalRevenue}</span>
            </div>
          </div>

          {/* Storefront Link & Lock */}
          <div className="flex items-center gap-2">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-2xl bg-white hover:bg-orange-50 text-slate-800 text-xs font-black border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-600" /> Open Storefront (5173)
            </a>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-2 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-black flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Lock
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Navigation Tabs Bar - Customer Header Style */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border-2 border-orange-200/80 shadow-md">
          {[
            { id: 'dishes', label: '📦 Dishes Catalog', icon: Utensils, badge: dishes.length },
            { id: 'new-dish', label: editingDish ? '✏️ Edit Dish' : '➕ Add New Dish', icon: Plus },
            { id: 'festive', label: '🎉 Festival Sale & Offers', icon: Sparkles },
            { id: 'live-status', label: '📻 Live Kitchen Status', icon: Radio, status: kitchenStatus },
            { id: 'orders', label: '🚚 Customer Orders', icon: ShoppingBag, badge: orders.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-950 text-yellow-300 shadow-md scale-102'
                    : 'text-slate-700 hover:text-red-600 hover:bg-orange-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black ${
                    isActive ? 'bg-yellow-300 text-slate-950' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DISHES CATALOG */}
        {activeTab === 'dishes' && (
          <div className="space-y-6">
            
            {/* Search & Category Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border-2 border-orange-200/80 shadow-md">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search dishes by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-amber-50/50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-black text-slate-700">Filter:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3.5 py-2.5 rounded-2xl bg-amber-50/50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch Meals</option>
                  <option value="dinner">Dinner Tiffin</option>
                  <option value="combos">Combos & Sappadu</option>
                </select>

                <button
                  onClick={resetFormToNew}
                  className="px-4 py-2.5 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 hover:from-red-700 text-white font-black text-xs rounded-2xl shadow-md flex items-center gap-1.5 ml-auto"
                >
                  <Plus className="w-4 h-4" /> Add Dish
                </button>
              </div>
            </div>

            {/* Dishes Grid - Styled like Storefront */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white border-2 border-orange-200/80 rounded-3xl p-5 space-y-4 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="flex gap-4">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          dish.type === 'veg' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                          {dish.type}
                        </span>
                        <span className="text-sm font-black text-red-600 font-mono">₹{dish.price}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 truncate font-serif">{dish.name}</h3>
                      <p className="text-[11px] font-medium text-slate-500 line-clamp-2 leading-relaxed">{dish.description}</p>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => {
                        toggleSoldOut(dish.id);
                        broadcastChange();
                      }}
                      className={`px-3 py-1.5 rounded-xl font-black text-[11px] transition-colors border shadow-xs ${
                        dish.isSoldOut 
                          ? 'bg-red-100 text-red-800 border-red-300' 
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      {dish.isSoldOut ? '🔴 Sold Out' : '🟢 Available'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEditDish(dish)}
                        className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-black border border-orange-200 text-xs flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete dish "${dish.name}"?`)) {
                            deleteDish(dish.id);
                            broadcastChange();
                          }
                        }}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: ADD / EDIT DISH FORM */}
        {activeTab === 'new-dish' && (
          <form onSubmit={handleSaveDishSubmit} className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border-2 border-orange-200/90 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black font-serif text-slate-900">
                {editingDish ? 'Edit Dish Details' : 'Add New Kovai Dish'}
              </h2>
              <button
                type="button"
                onClick={() => setActiveTab('dishes')}
                className="text-xs font-extrabold text-orange-600 hover:underline"
              >
                ← Back to Dishes List
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coimbatore Kongu Nattu Kozhi Kuzhambu"
                  value={dishForm.name}
                  onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={dishForm.price}
                  onChange={(e) => setDishForm({ ...dishForm, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Original Price (M.R.P ₹)</label>
                <input
                  type="number"
                  value={dishForm.originalPrice || ''}
                  onChange={(e) => setDishForm({ ...dishForm, originalPrice: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Category *</label>
                <select
                  value={dishForm.category}
                  onChange={(e) => setDishForm({ ...dishForm, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch Meals</option>
                  <option value="dinner">Dinner Tiffin</option>
                  <option value="combos">Combos & Sappadu</option>
                </select>
              </div>

              <div>
                <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Food Type *</label>
                <select
                  value={dishForm.type}
                  onChange={(e) => setDishForm({ ...dishForm, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none"
                >
                  <option value="veg">🟢 Veg</option>
                  <option value="non-veg">🔴 Non-Veg</option>
                </select>
              </div>

              <div>
                <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Spice Level (1 to 4)</label>
                <select
                  value={dishForm.spiceLevel}
                  onChange={(e) => setDishForm({ ...dishForm, spiceLevel: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none"
                >
                  <option value={1}>🌶️ 1 - Mild</option>
                  <option value={2}>🌶️🌶️ 2 - Medium</option>
                  <option value={3}>🌶️🌶️🌶️ 3 - Spicy</option>
                  <option value={4}>🌶️🌶️🌶️🌶️ 4 - Extra Hot</option>
                </select>
              </div>

              <div>
                <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Photo Image URL *</label>
                <input
                  type="url"
                  required
                  value={dishForm.image}
                  onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={dishForm.description}
                  onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 hover:opacity-90 text-white font-black text-sm rounded-2xl shadow-xl transition-all"
            >
              {editingDish ? 'Save Changes to Dish' : 'Publish New Dish to Storefront'}
            </button>
          </form>
        )}

        {/* TAB 3: FESTIVAL SALE & OFFERS */}
        {activeTab === 'festive' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-orange-200/90 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-black font-serif text-slate-900">Festival Sale & Offer Settings</h3>
                </div>

                <label className="flex items-center gap-2 cursor-pointer bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
                  <input
                    type="checkbox"
                    checked={isFestiveMode}
                    onChange={(e) => {
                      setIsFestiveMode(e.target.checked);
                      broadcastChange();
                    }}
                    className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
                  />
                  <span className="text-xs font-black text-orange-900">
                    {isFestiveMode ? '🎉 FESTIVE MODE ACTIVE' : 'OFF'}
                  </span>
                </label>
              </div>

              <form onSubmit={handleSaveFestive} className="space-y-4 text-xs">
                <div>
                  <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Festival Sale Title *</label>
                  <input
                    type="text"
                    required
                    value={festiveTitle}
                    onChange={(e) => setFestiveTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Banner Announcement Message *</label>
                  <input
                    type="text"
                    required
                    value={festiveMsg}
                    onChange={(e) => setFestiveMsg(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Global Discount (%) *</label>
                  <input
                    type="number"
                    required
                    value={festiveDiscount}
                    onChange={(e) => setFestiveDiscount(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-mono font-black text-red-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all"
                >
                  Save Festival Offer Settings
                </button>
              </form>
            </div>

          </div>
        )}

        {/* TAB 4: LIVE KITCHEN STATUS */}
        {activeTab === 'live-status' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-orange-200/90 shadow-xl space-y-6">
              <h3 className="text-lg font-black font-serif text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-600" /> Kitchen Operational Status Control
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { status: 'Open', label: '🟢 Kitchen Open', desc: 'Accepting instant doorstep orders', color: 'border-emerald-500 bg-emerald-50 text-emerald-950 font-black' },
                  { status: 'Busy', label: '🟡 Kitchen Busy', desc: 'High volume - pre-orders active', color: 'border-yellow-500 bg-yellow-50 text-yellow-950 font-black' },
                  { status: 'Closed', label: '🔴 Kitchen Closed', desc: 'Closed - orders blocked', color: 'border-red-500 bg-red-50 text-red-950 font-black' },
                ].map((item) => (
                  <button
                    key={item.status}
                    type="button"
                    onClick={() => {
                      setKitchenStatus(item.status);
                      broadcastChange({ kitchenStatus: item.status });
                    }}
                    className={`p-4 rounded-2xl border-2 text-left space-y-1 transition-all ${
                      kitchenStatus === item.status ? `${item.color} shadow-md scale-102` : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black block">{item.label}</span>
                    <span className="text-[11px] font-medium block opacity-80">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveLiveStatus} className="bg-white p-6 rounded-3xl border-2 border-orange-200/90 shadow-xl space-y-4">
              <h4 className="text-base font-black text-slate-900 font-serif border-b border-slate-100 pb-3">
                Live Announcement Message Ticker
              </h4>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Live Status Message *</label>
                <input
                  type="text"
                  required
                  value={liveMsg}
                  onChange={(e) => setLiveMsg(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 text-yellow-300 font-black text-xs rounded-2xl shadow-md"
              >
                Update Announcement Ticker
              </button>
            </form>

          </div>
        )}

        {/* TAB 5: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border-2 border-orange-200/80 shadow-md flex items-center justify-between">
              <h3 className="text-base font-black font-serif text-slate-900">Live Customer Orders ({orders.length})</h3>
              <span className="text-xs font-mono font-black text-red-600">Total Revenue: ₹{totalRevenue}</span>
            </div>

            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border-2 border-orange-200/80 rounded-3xl p-5 space-y-3 shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                        {order.id}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">{order.customerName}</span>
                      <span className="text-xs text-slate-500 font-mono">({order.phone})</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-700 font-black">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => {
                          updateOrderStatus(order.id, e.target.value);
                          broadcastChange();
                        }}
                        className="px-3 py-1 rounded-xl bg-slate-900 text-yellow-300 border border-slate-800 text-xs font-black focus:outline-none"
                      >
                        <option value="Received">Received</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 space-y-1">
                    <p><strong className="text-slate-900">Address:</strong> {order.address}</p>
                    <p><strong className="text-slate-900">Delivery Slot:</strong> {order.deliverySlot}</p>
                    <p><strong className="text-slate-900">Payment:</strong> {order.paymentMethod}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Placed at {order.placedAt}</span>
                    <span className="text-sm font-black font-mono text-red-600">₹{order.totalAmount}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Hidden iframe bridge connecting port 5174 admin to port 5173 storefront */}
      <iframe
        id="storefront-sync-iframe"
        src="http://localhost:5173"
        title="Storefront Cross-Port Sync Bridge"
        style={{ display: 'none', width: 0, height: 0, border: 'none' }}
        onLoad={() => broadcastChange()}
      />
    </div>
  );
}
