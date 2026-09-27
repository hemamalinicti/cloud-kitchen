import React from 'react';
import AdminModal from '../components/AdminModal';
import { useApp } from '../context/AppContext';

export default function AdminPage() {
  const { setIsAdminOpen } = useApp();

  React.useEffect(() => {
    setIsAdminOpen(true);
  }, []);

  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 min-h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
      <h2 className="text-2xl font-extrabold text-slate-900 font-serif">Kitchen Admin Portal</h2>
      <p className="text-xs text-slate-500 max-w-sm">
        The admin dashboard modal is opened automatically. Default passcode is <strong className="font-mono text-brand-600">admin123</strong>.
      </p>
      <button
        onClick={() => setIsAdminOpen(true)}
        className="px-6 py-3 bg-brand-500 text-white font-extrabold text-xs rounded-2xl shadow-lg"
      >
        Re-open Admin Modal
      </button>
    </div>
  );
}
