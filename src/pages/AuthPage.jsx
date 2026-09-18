import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  AlertCircle,
  Key
} from 'lucide-react';

export default function AuthPage() {
  const { loginUser, registerUser, navigateTo, setIsAdminOpen, setIsCartOpen } = useApp();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
  const [errorMsg, setErrorMsg] = useState('');

  // Sign In Form State
  const [signInInput, setSignInInput] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form State
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!signInInput || !signInPassword) {
      setErrorMsg('Please enter both Email/Phone and Password.');
      return;
    }

    const result = loginUser(signInInput, signInPassword);

    if (result.success) {
      if (result.role === 'admin') {
        navigateTo('admin');
        setIsAdminOpen(true);
      } else {
        navigateTo('menu');
      }
    } else {
      setErrorMsg(result.error);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!signUpForm.name || !signUpForm.email || !signUpForm.phone || !signUpForm.address || !signUpForm.password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const result = registerUser(signUpForm);

    if (result.success) {
      navigateTo('menu');
    } else {
      setErrorMsg(result.error);
    }
  };

  const setDemoAdmin = () => {
    setSignInInput('cloudkitchen@gmail.com');
    setSignInPassword('Cloud@456');
    setErrorMsg('');
  };

  const setDemoCustomer = () => {
    setSignInInput('user@gmail.com');
    setSignInPassword('User@123');
    setErrorMsg('');
  };

  return (
    <div className="pt-20 sm:pt-28 pb-12 sm:pb-16 min-h-[85vh] flex items-center justify-center bg-amber-50/50 px-3 sm:px-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-orange-200/90 overflow-hidden space-y-6 p-6 sm:p-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider border border-yellow-400 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>Coimbatore CloudKitchen Portal</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-serif text-slate-900">
            Welcome to CloudKitchen
          </h2>

          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Sign in to place orders, track live meals, or access the admin dashboard.
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-2 border border-slate-200">
          <button
            onClick={() => {
              setActiveTab('signin');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'signin'
                ? 'bg-slate-950 text-yellow-300 shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Lock className="w-4 h-4 text-orange-400" /> Sign In
          </button>

          <button
            onClick={() => {
              setActiveTab('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'signup'
                ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <User className="w-4 h-4" /> Customer Sign Up
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-800 font-extrabold animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* TAB 1: SIGN IN FORM */}
        {activeTab === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                Email Address or Mobile Number *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="cloudkitchen@gmail.com or +91 98765 43210"
                  value={signInInput}
                  onChange={(e) => setSignInInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 hover:from-red-700 hover:to-yellow-400 text-white font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              Sign In to Account <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Credentials Helper Box */}
            <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
              <span className="font-extrabold text-slate-500 uppercase tracking-wider block text-center">Quick Demo Login Shortcuts:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={setDemoAdmin}
                  className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-950 font-extrabold text-left flex flex-col justify-between"
                >
                  <span className="text-[10px] font-black uppercase text-red-600">👑 Admin Login</span>
                  <span className="text-[11px] truncate font-mono">cloudkitchen@gmail.com</span>
                </button>

                <button
                  type="button"
                  onClick={setDemoCustomer}
                  className="p-2.5 rounded-xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 text-yellow-950 font-extrabold text-left flex flex-col justify-between"
                >
                  <span className="text-[10px] font-black uppercase text-orange-600">👤 Customer Login</span>
                  <span className="text-[11px] truncate font-mono">user@gmail.com</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* TAB 2: CUSTOMER SIGN UP FORM */
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Senthil Kumar"
                  value={signUpForm.name}
                  onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="senthil@gmail.com"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Mobile Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={signUpForm.phone}
                    onChange={(e) => setSignUpForm({ ...signUpForm, phone: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Delivery Location / Address (Coimbatore) *</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <textarea
                  required
                  rows={2}
                  placeholder="Door No, Street Name, Area (e.g. RS Puram / Peelamedu / Gandhipuram)"
                  value={signUpForm.address}
                  onChange={(e) => setSignUpForm({ ...signUpForm, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Create Password *</label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Create password for future sign in"
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 via-orange-500 to-green-600 hover:opacity-90 text-white font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              Create Customer Account & Start Ordering <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
