import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Truck, CheckCircle2, Flame, Clock, Search, MapPin, PackageCheck, Sparkles } from 'lucide-react';

export default function OrderTrackerModal() {
  const { isOrderTrackerOpen, setIsOrderTrackerOpen, orders, trackingOrderId, setTrackingOrderId } = useApp();

  const [inputOrderId, setInputOrderId] = useState(trackingOrderId || '');

  if (!isOrderTrackerOpen) return null;

  const currentOrder = orders.find(
    (o) => o.id.toLowerCase() === inputOrderId.trim().toLowerCase()
  ) || orders[0];

  const steps = [
    { key: 'Received', label: 'Order Received', desc: 'Kitchen accepted your order', icon: PackageCheck },
    { key: 'Cooking', label: 'Cooking Fresh', desc: 'Chefs preparing your food now', icon: Flame },
    { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Rider assigned & en route', icon: Truck },
    { key: 'Delivered', label: 'Delivered', desc: 'Enjoy your hot meal!', icon: CheckCircle2 },
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Received': return 0;
      case 'Cooking': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 1;
    }
  };

  const activeStepIdx = currentOrder ? getStepIndex(currentOrder.status) : 1;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOrderTrackerOpen(false)}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-200 space-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colorful Gradient Header Banner */}
        <div className="bg-gradient-to-r from-red-600 via-orange-500 via-amber-500 to-emerald-600 p-5 sm:p-6 text-white relative shadow-lg">
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/40 text-white hover:bg-slate-950 flex items-center justify-center transition-all shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md text-yellow-300 flex items-center justify-center font-bold shadow-md border border-white/30 animate-pulse">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-yellow-200 block">Live Order Tracker</span>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-white">Live Meal Status & Delivery</h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Order ID Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. CK-9821)"
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-orange-50/80 border-2 border-orange-200 text-xs font-extrabold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 font-mono shadow-inner"
            />
          </div>

          {currentOrder ? (
            <div className="space-y-6">
              {/* Order Reference Gradient Card */}
              <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 rounded-2xl border-2 border-orange-400/50 text-white flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[10px] font-black uppercase text-yellow-400 tracking-wider block">Order Reference</span>
                  <h4 className="text-lg sm:text-xl font-black font-mono text-white">{currentOrder.id}</h4>
                  <span className="text-[11px] text-slate-300 font-bold block mt-0.5">Placed at {currentOrder.placedAt}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Delivery Slot</span>
                  <span className="text-xs font-black text-amber-300 block">{currentOrder.deliverySlot}</span>
                  <span className="text-sm font-black text-emerald-400 block mt-0.5 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">₹{currentOrder.totalAmount}</span>
                </div>
              </div>

              {/* Animated Live Status Timeline */}
              <div className="space-y-3 bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-orange-600 animate-spin-slow" />
                    <span>Live Preparation & Delivery Timeline</span>
                  </h4>
                  <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Live Updates Active
                  </span>
                </div>
                
                <div className="relative flex flex-col space-y-5 pl-4 ml-3 pt-2">
                  {steps.map((st, idx) => {
                    const isDone = idx <= activeStepIdx;
                    const isCurrent = idx === activeStepIdx;
                    const StepIcon = st.icon;

                    return (
                      <div key={st.key} className="relative flex items-start gap-3.5 group">
                        {/* Connecting Line */}
                        {idx < steps.length - 1 && (
                          <div className={`absolute left-[-16px] top-7 bottom-[-20px] w-1.5 rounded-full transition-colors ${
                            idx < activeStepIdx ? 'bg-emerald-500' : 'bg-slate-200'
                          }`} />
                        )}

                        {/* Step Circle Node */}
                        <div className={`absolute -left-[27px] top-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md transition-all ${
                          isCurrent
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white ring-4 ring-orange-500/30 animate-pulse scale-110'
                            : isDone
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                            : 'bg-slate-100 text-slate-400 border-2 border-slate-300'
                        }`}>
                          <StepIcon className="w-3.5 h-3.5" />
                        </div>

                        <div className="pl-3 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-black ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                              {st.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] bg-gradient-to-r from-red-600 to-orange-500 text-white font-black px-2.5 py-0.5 rounded-full animate-bounce shadow-xs">
                                In Progress 🔥
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 font-semibold">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Address Card */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-200 rounded-2xl text-emerald-950 font-bold flex items-center gap-3 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-black text-emerald-900 block uppercase text-[10px] tracking-wider">Doorstep Delivery Destination:</span>
                  <span className="font-extrabold text-slate-900">{currentOrder.address}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-2">
              <p className="text-sm font-bold text-slate-700">No active order found with ID "{inputOrderId}"</p>
              <p className="text-xs text-slate-400">Please check your receipt or order confirmation.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
