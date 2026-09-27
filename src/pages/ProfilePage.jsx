import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Check, 
  X, 
  ShoppingBag, 
  Truck, 
  Clock, 
  ShieldCheck, 
  CreditCard,
  ChefHat,
  ArrowRight,
  LogOut,
  Calendar
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUserProfile, orders, setIsOrderTrackerOpen, setTrackingOrderId, navigateTo, logoutUser } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Form edit state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) {
    return (
      <div className="pt-28 pb-16 min-h-[75vh] flex items-center justify-center bg-amber-50/40 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-xl border border-orange-200 space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            👤
          </div>
          <h2 className="text-xl font-serif font-black text-slate-900">Please Sign In to View Profile</h2>
          <p className="text-xs font-semibold text-slate-500">
            You need to be logged in to access your personal profile details and track past order history.
          </p>
          <button
            onClick={() => navigateTo('auth')}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-xs font-black rounded-2xl shadow-md"
          >
            Go to Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  const handleStartEdit = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || ''
    });
    setIsEditing(true);
    setSaveSuccessMsg('');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all profile fields.');
      return;
    }

    updateUserProfile(formData);
    setIsEditing(false);
    setSaveSuccessMsg('✅ Profile information updated successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Filter orders related to this user
  const userOrders = orders.filter((o) => {
    if (user.role === 'admin') return true; // Admin can view all orders
    return (
      o.customerName?.toLowerCase() === user.name?.toLowerCase() ||
      o.phone === user.phone ||
      o.customerName?.toLowerCase().includes(user.name?.toLowerCase().split(' ')[0] || '')
    );
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Cooking':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 min-h-[85vh] bg-amber-50/30 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Hero Header Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-amber-800/40">
          
          <div className="flex items-center gap-4 sm:gap-6 z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-white/30 flex-shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-3xl font-black font-serif text-amber-100">{user.name}</h1>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border shadow-xs ${
                  user.role === 'admin' 
                    ? 'bg-red-500 text-white border-red-400' 
                    : 'bg-yellow-400 text-slate-950 border-yellow-300'
                }`}>
                  {user.role === 'admin' ? '👑 Admin' : '👤 Customer'}
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-2 font-mono">
                <Mail className="w-3.5 h-3.5 text-amber-400" /> {user.email}
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> {user.phone}
              </p>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-3 z-10 w-full sm:w-auto justify-end border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
            {user.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
              >
                <ChefHat className="w-4 h-4" /> Admin Dashboard
              </button>
            )}
            <button
              onClick={logoutUser}
              className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* Background Decorative Blur Pattern */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {saveSuccessMsg && (
          <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs font-black text-emerald-800 animate-fade-in flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* 2-Column Grid: Profile Info & Order History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMN 1: Personal Details & Edit Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-orange-200/80 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-600" />
                  <h2 className="text-lg font-black font-serif text-slate-900">Personal Info</h2>
                </div>

                {!isEditing && (
                  <button
                    onClick={handleStartEdit}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 text-xs font-black transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Info
                  </button>
                )}
              </div>

              {!isEditing ? (
                /* View Mode */
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Full Name</span>
                    <p className="font-extrabold text-slate-900 text-sm">{user.name}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Email Address</span>
                    <p className="font-semibold text-slate-800 font-mono">{user.email}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Mobile Number</span>
                    <p className="font-semibold text-slate-800 font-mono">{user.phone}</p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" /> Default Delivery Address
                    </span>
                    <p className="font-medium text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                      {user.address || 'No address provided yet.'}
                    </p>
                  </div>
                </div>
              ) : (
                /* Edit Mode Form */
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-slate-800 uppercase tracking-wider mb-1">Delivery Address *</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold hover:bg-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* COLUMN 2: My Orders & History (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-orange-200/80 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-600" />
                  <h2 className="text-lg font-black font-serif text-slate-900">
                    {user.role === 'admin' ? 'All Live Customer Orders' : 'My Orders & History'}
                  </h2>
                </div>
                <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full border border-amber-300">
                  {userOrders.length} Order{userOrders.length !== 1 ? 's' : ''}
                </span>
              </div>

              {userOrders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    🍲
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-800">No orders placed yet</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Explore our fresh Kovai home food menu and place your first delicious order today!
                  </p>
                  <button
                    onClick={() => navigateTo('menu')}
                    className="mt-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-black rounded-xl shadow-md hover:from-red-700 hover:to-orange-600"
                  >
                    Browse Daily Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3.5 hover:border-amber-400 transition-colors shadow-xs"
                    >
                      {/* Top Order Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                            {order.id}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> {order.placedAt}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-black px-3 py-1 rounded-full border shadow-xs ${getStatusBadgeClass(order.status)}`}>
                            ● {order.status}
                          </span>
                          <button
                            onClick={() => {
                              setTrackingOrderId(order.id);
                              setIsOrderTrackerOpen(true);
                            }}
                            className="flex items-center gap-1 text-xs font-black text-slate-900 bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded-full border border-yellow-400 shadow-xs"
                          >
                            <Truck className="w-3.5 h-3.5 text-orange-700" /> Track Live
                          </button>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-1.5 text-xs">
                        <span className="font-extrabold text-slate-700 text-[11px] uppercase tracking-wider">Items Ordered:</span>
                        <ul className="space-y-1">
                          {order.items?.map((item, idx) => (
                            <li key={idx} className="flex justify-between font-medium text-slate-800">
                              <span>
                                {item.quantity}x {item.name} {item.spiceLevel ? `(Spice Lvl ${item.spiceLevel})` : ''}
                              </span>
                              <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Order Footer Info */}
                      <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center justify-between text-xs gap-2">
                        <div className="space-y-0.5">
                          <p className="text-[11px] text-slate-500 font-medium">Slot: <strong className="text-slate-800">{order.deliverySlot}</strong></p>
                          <p className="text-[11px] text-slate-500 font-medium">Address: <strong className="text-slate-800">{order.address}</strong></p>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] uppercase font-black text-slate-400 block">Total Amount</span>
                          <span className="text-sm font-black text-red-600">₹{order.totalAmount}</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
