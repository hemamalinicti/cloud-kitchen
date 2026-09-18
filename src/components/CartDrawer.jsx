import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Clock, 
  Tag, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  MapPin,
  Flame,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateCartQty, updateCartSpiceLevel, removeFromCart, placeOrder, navigateTo, user, kitchenStatus } = useApp();
  const isKitchenClosed = kitchenStatus?.toLowerCase() === 'closed';

  const [step, setStep] = useState('cart'); // 'cart', 'checkout'
  const [deliverySlot, setDeliverySlot] = useState('12:00 PM - 01:30 PM (Lunch)');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Checkout form details
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Online Razorpay (Cards / UPI / NetBanking)');

  useEffect(() => {
    if (user) {
      if (user.name) setCustomerName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.address) setAddress(user.address);
    }
  }, [user]);

  if (!isCartOpen) return null;

  // Totals calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = subtotal > 400 || subtotal === 0 ? 0 : 40;
  const taxes = Math.round(subtotal * 0.05);
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee + taxes);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'HOMEFOOD10') {
      setDiscountPercent(10);
      setPromoMessage('✅ 10% Coupon Discount Applied!');
    } else if (promoCode.trim().toUpperCase() === 'FIRSTBUY') {
      setDiscountPercent(15);
      setPromoMessage('🎉 15% First Order Special Applied!');
    } else {
      setPromoMessage('❌ Invalid coupon. Try HOMEFOOD10');
    }
  };

  const handleProceedToCheckout = () => {
    if (isKitchenClosed) {
      alert('🚫 Kitchen is currently CLOSED! We are not accepting orders at this time.');
      return;
    }
    if (!user) {
      setIsCartOpen(false);
      navigateTo('auth');
      return;
    }
    if (!customerName && user.name) setCustomerName(user.name);
    if (!phone && user.phone) setPhone(user.phone);
    if (!address && user.address) setAddress(user.address);
    setStep('checkout');
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (isKitchenClosed) {
      alert('🚫 Kitchen is currently CLOSED! Orders cannot be placed at this time.');
      return;
    }
    if (!user) {
      setIsCartOpen(false);
      navigateTo('auth');
      return;
    }
    if (!customerName || !phone || !address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    placeOrder({
      name: customerName,
      phone: phone,
      address: address,
      deliverySlot: deliverySlot,
      totalAmount: finalTotal,
      paymentMethod: paymentMethod,
    });
    setStep('cart');
  };

  return (
    <div 
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fade-in cursor-pointer"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-amber-100 cursor-default"
        >
          
          {/* Top Header */}
          <div className="p-5 bg-gradient-to-r from-amber-600 to-brand-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-lg font-extrabold font-serif">
                {step === 'cart' ? 'Your Fresh Cart' : 'Delivery & Payment'}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Content Body */}
          <div className="overflow-y-auto flex-1 p-5 space-y-6">
            
            {isKitchenClosed && (
              <div className="p-3.5 bg-red-100 border-2 border-red-300 rounded-2xl text-xs font-black text-red-950 flex items-center gap-2.5 animate-shake">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>🚫 Kitchen is currently CLOSED. We are not accepting new orders right now.</span>
              </div>
            )}
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  🛒
                </div>
                <h3 className="text-base font-extrabold text-slate-800">Your cart is currently empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse today's live menu and add your favorite home-cooked meals to get started.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('menu');
                  }}
                  className="mt-2 px-5 py-2.5 bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md hover:bg-brand-600"
                >
                  Browse Menu
                </button>
              </div>
            ) : step === 'cart' ? (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Ordered Items</h3>
                  {cart.map((item) => {
                    const currentSpice = item.spiceLevel || 2;
                    const spiceNames = { 1: 'Mild', 2: 'Medium', 3: 'Spicy', 4: 'Extra Hot' };
                    
                    return (
                      <div
                        key={item.cartItemId}
                        className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-extrabold text-brand-600">₹{item.price}</span>
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                                <Flame className="w-2.5 h-2.5 text-red-600 fill-red-600" />
                                {spiceNames[currentSpice] || 'Medium'} (Lvl {currentSpice})
                              </span>
                            </div>
                          </div>

                          {/* Qty Controls */}
                          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
                            <button
                              onClick={() => updateCartQty(item.cartItemId, -1)}
                              className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 font-bold hover:bg-slate-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black px-1.5 text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.cartItemId, 1)}
                              className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 font-bold hover:bg-slate-200"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Interactive Spice Level Adjuster Strip in Cart */}
                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold">
                          <span className="text-slate-500 flex items-center gap-1">
                            🌶️ Adjust Spice:
                          </span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map((sLvl) => (
                              <button
                                key={sLvl}
                                onClick={() => updateCartSpiceLevel(item.cartItemId, sLvl)}
                                className={`px-2 py-0.5 rounded-md font-mono transition-all ${
                                  currentSpice === sLvl
                                    ? 'bg-red-600 text-white font-extrabold shadow-xs'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                Lvl {sLvl}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Slot Dropdown */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/70 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-900 text-xs font-extrabold">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Select Preferred Delivery Slot:</span>
                  </div>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option>12:00 PM - 01:30 PM (Lunch)</option>
                    <option>01:30 PM - 03:00 PM (Lunch)</option>
                    <option>07:00 PM - 08:30 PM (Dinner)</option>
                    <option>08:30 PM - 10:00 PM (Dinner)</option>
                  </select>
                </div>

                {/* Promo Code Box */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">Promo Coupon</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try HOMEFOOD10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold uppercase focus:outline-none"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && <p className="text-[11px] font-bold mt-1 text-emerald-600">{promoMessage}</p>}
                </div>

                {/* Price Breakdown */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Coupon Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Doorstep Delivery Fee</span>
                    <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>GST Taxes (5%)</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                    <span>To Pay</span>
                    <span className="text-brand-600">₹{finalTotal}</span>
                  </div>
                </div>
              </>
            ) : (
              /* Step 2: Checkout Form */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyadarshini R"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Complete Delivery Address *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Flat No, Apartment, Street name, Landmark, Pincode"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Select Payment Method</label>
                  <div className="space-y-2">
                    {[
                      'Online Razorpay (Cards / UPI / NetBanking)',
                      'Cash on Delivery (COD)'
                    ].map((mode) => (
                      <label
                        key={mode}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold cursor-pointer ${
                          paymentMethod === mode ? 'border-brand-500 bg-brand-50 text-brand-950' : 'border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === mode}
                          onChange={() => setPaymentMethod(mode)}
                        />
                        <span>{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-medium">
                  🔒 256-bit encrypted checkout. Your meal order will be routed instantly to our home kitchen.
                </div>
              </form>
            )}

          </div>

          {/* Footer CTA */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              {isKitchenClosed ? (
                <button
                  disabled
                  className="w-full py-3.5 bg-red-100 text-red-700 border-2 border-red-300 font-black text-xs sm:text-sm rounded-2xl cursor-not-allowed text-center shadow-xs"
                >
                  🚫 Kitchen Closed — Orders Disabled
                </button>
              ) : step === 'cart' ? (
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  Proceed to Checkout — ₹{finalTotal} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep('cart')}
                    className="w-1/3 py-3 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={handleCheckoutSubmit}
                    className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xl flex items-center justify-center gap-2"
                  >
                    Place Order Now — ₹{finalTotal}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
