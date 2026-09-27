import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import KitchenPage from './pages/KitchenPage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

import DishDetailModal from './components/DishDetailModal';
import TasteQuizModal from './components/TasteQuizModal';
import TiffinBuilderModal from './components/TiffinBuilderModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import CartDrawer from './components/CartDrawer';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';

function MainLayout() {
  const { currentPage, isFestiveMode } = useApp();

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'subscriptions':
        return <SubscriptionsPage />;
      case 'kitchen':
        return <KitchenPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      case 'auth':
        return <AuthPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 flex flex-col justify-between bg-amber-50/30 text-slate-900">
      <Header />
      <main className="flex-1">
        {renderActivePage()}
      </main>
      <Footer />

      {/* Global Drawers & Modals */}
      <DishDetailModal />
      <TasteQuizModal />
      <TiffinBuilderModal />
      <OrderTrackerModal />
      <CartDrawer />
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
