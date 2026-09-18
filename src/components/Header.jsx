import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Clock, 
  Sparkles, 
  UserCheck, 
  Menu as MenuIcon, 
  X,
  Truck,
  ShieldCheck,
  LogOut
} from 'lucide-react';

export default function Header() {
  const { 
    currentPage,
    navigateTo,
    cart, 
    setIsCartOpen, 
    setIsAdminOpen, 
    setIsTasteQuizOpen, 
    setIsOrderTrackerOpen,
    kitchenStatus,
    cutoffSeconds,
    user,
    logoutUser 
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const centerNavLinks = [
    { id: 'home', name: 'Home' },
    { id: 'kitchen', name: 'About' },
    { id: 'menu', name: 'Menu' },
    { id: 'subscriptions', name: 'Subscriptions' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'contact', name: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Portion 1: Top Slim Live Status Strip (Dark Theme) */}
      <div className="bg-slate-950 text-white border-b border-slate-800 py-1.5 shadow-sm">
        <div className="max-w-[96%] mx-auto px-2.5 sm:px-6 lg:px-8 hidden md:flex items-center justify-between text-xs font-bold text-slate-300">
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 px-3 py-0.5 rounded-full border font-black shadow-sm ${
              kitchenStatus?.toLowerCase() === 'closed'
                ? 'bg-red-950/80 text-red-300 border-red-800'
                : kitchenStatus?.toLowerCase() === 'busy'
                ? 'bg-yellow-950/80 text-yellow-300 border-yellow-800'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                kitchenStatus?.toLowerCase() === 'closed'
                  ? 'bg-red-500'
                  : kitchenStatus?.toLowerCase() === 'busy'
                  ? 'bg-yellow-400 animate-pulse'
                  : 'bg-emerald-400 animate-ping'
              }`} />
              Kitchen Live: {kitchenStatus} {kitchenStatus?.toLowerCase() === 'closed' ? '(Orders Off)' : ''}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-red-400 font-extrabold bg-red-950/60 px-3 py-0.5 rounded-full border border-red-800/80">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>Lunch Cut-off: <strong className="font-mono text-red-200">{formatTime(cutoffSeconds)}</strong></span>
            </div>

            <button 
              onClick={() => setIsTasteQuizOpen(true)}
              className="hover:text-slate-950 transition-all flex items-center gap-1 text-xs font-black text-slate-950 bg-yellow-400 hover:bg-yellow-300 px-2.5 py-0.5 rounded-full border border-yellow-400 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600" /> Taste Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Portion 2: Main Navbar Row (Light Theme - As Before) */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-orange-200/80 py-2.5 text-slate-900' 
          : 'bg-amber-50/95 backdrop-blur-sm py-3 border-b border-orange-200/60 text-slate-900'
      }`}>
        <div className="max-w-[96%] mx-auto px-2.5 sm:px-6 lg:px-8 space-y-2">
          
          {/* Global Prominent Kitchen Closed Banner if Closed */}
          {kitchenStatus?.toLowerCase() === 'closed' && (
            <div className="bg-red-600 text-white font-black text-xs sm:text-sm py-2 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-center animate-shake">
              <span>🚫 KITCHEN CLOSED NOTICE: We are currently closed for orders. Please check back when kitchen re-opens!</span>
            </div>
          )}

          {/* Main Navbar Row (Light Theme) */}
          <div className="flex items-center justify-between gap-2 sm:gap-6">
            
            {/* Brand Logo & Website Name */}
            <button onClick={() => navigateTo('home')} className="flex items-center gap-1.5 sm:gap-2.5 group text-left flex-shrink-0">
              <img
                src="/images/logo_icon.png"
                alt="CloudKitchen"
                className="h-8 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col justify-center">
                <span className="text-base sm:text-xl font-black font-serif tracking-tight text-slate-950 group-hover:text-red-600 transition-colors leading-none">
                  Cloud<span className="text-red-600">Kitchen</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold text-orange-600 tracking-wider uppercase mt-0.5">
                  Kovai Home Food
                </span>
              </div>
            </button>

            {/* Center Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-1 bg-white/90 p-1.5 rounded-full border border-orange-200 shadow-sm flex-1 max-w-2xl mx-auto">
              {centerNavLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => navigateTo(link.id)}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-black transition-all ${
                      isActive
                        ? 'bg-slate-900 text-yellow-300 shadow-md scale-105'
                        : 'text-slate-800 hover:text-red-600 hover:bg-orange-50'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Track Order */}
              <button
                onClick={() => setIsOrderTrackerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-black text-slate-800 bg-white hover:bg-emerald-50 border border-emerald-300 transition-colors shadow-sm text-emerald-800"
              >
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Track Order</span>
              </button>

              {/* User Login / Profile Badge */}
              {user ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => navigateTo('profile')}
                    title="View Profile & Orders"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-black bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300 transition-colors shadow-xs"
                  >
                    <UserCheck className="w-4 h-4 text-amber-600" />
                    <span className="hidden md:inline">{user.role === 'admin' ? '👑 Admin Profile' : `Hi, ${user.name.split(' ')[0]}`}</span>
                  </button>
                  <button
                    onClick={logoutUser}
                    title="Logout"
                    className="p-2 rounded-2xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors flex items-center justify-center"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigateTo('auth')}
                  className="flex items-center gap-1 px-3 py-2 rounded-2xl text-xs font-black text-slate-800 bg-white hover:bg-orange-50 border border-slate-200 transition-colors shadow-sm"
                >
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  <span>Login</span>
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart</span>
                {totalCartCount > 0 && (
                  <span className="bg-yellow-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full border border-white">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions & Menu Icon */}
            <div className="flex sm:hidden items-center gap-1.5">
              {/* Mobile Track Order Button */}
              <button
                onClick={() => setIsOrderTrackerOpen(true)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-300 font-extrabold text-xs shadow-xs"
              >
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Track</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-extrabold"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-2xl bg-slate-100 text-slate-900 font-bold"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Dropdown Nav Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-orange-200 bg-white rounded-3xl p-5 shadow-2xl space-y-3">
              <div className="flex flex-wrap items-center justify-between pb-2 border-b border-slate-100 text-xs text-slate-700 font-extrabold gap-2">
                <span className="text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">Kitchen Live: {kitchenStatus}</span>
                <span className="text-red-700 bg-red-100 px-2.5 py-1 rounded-full">Cut-off: {formatTime(cutoffSeconds)}</span>
              </div>
              
              {centerNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left font-black text-sm py-2.5 px-4 rounded-2xl transition-all ${
                    currentPage === link.id
                      ? 'bg-slate-900 text-yellow-300'
                      : 'text-slate-800 hover:bg-orange-50'
                  }`}
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => {
                    setIsOrderTrackerOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-slate-100 text-slate-900 font-black text-xs flex items-center justify-center gap-1.5"
                >
                  <Truck className="w-4 h-4 text-emerald-600" /> Track Order
                </button>

                {user ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigateTo('profile');
                        setMobileMenuOpen(false);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-2xl bg-amber-100 text-amber-950 font-black text-xs flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-4 h-4 text-amber-600" />
                      <span>{user.role === 'admin' ? '👑 Admin Profile' : `My Profile (${user.name.split(' ')[0]})`}</span>
                    </button>
                    <button
                      onClick={() => {
                        logoutUser();
                        setMobileMenuOpen(false);
                      }}
                      className="py-2.5 px-3 rounded-2xl bg-red-100 text-red-700 font-black text-xs flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigateTo('auth');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-3 rounded-2xl bg-slate-100 text-slate-900 font-black text-xs flex items-center justify-center gap-1.5"
                  >
                    <UserCheck className="w-4 h-4 text-amber-600" /> Login / Sign Up
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
