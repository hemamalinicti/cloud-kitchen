import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DISHES, REVIEWS_DATA } from '../data/initialData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Page Routing State ('home', 'menu', 'subscriptions', 'kitchen', 'gallery', 'reviews', 'contact', 'admin', 'auth')
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cloudkitchen_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('cloudkitchen_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cloudkitchen_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cloudkitchen_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cloudkitchen_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Login handler for Admin & Customer
  const loginUser = (emailOrPhone, password) => {
    const inputClean = emailOrPhone.trim().toLowerCase();
    
    // Check Admin Login (email: cloudkitchen@gmail.com, password: Cloud@456)
    if (inputClean === 'cloudkitchen@gmail.com' && password === 'Cloud@456') {
      const adminUser = {
        name: 'CloudKitchen Admin',
        email: 'cloudkitchen@gmail.com',
        phone: '+91 98765 43210',
        address: 'RS Puram Hub, Coimbatore',
        role: 'admin'
      };
      setUser(adminUser);
      setIsAdminOpen(true);
      return { success: true, role: 'admin' };
    }

    // Check Customer Login
    const foundCustomer = registeredUsers.find(
      (u) => (u.email.toLowerCase() === inputClean || u.phone === emailOrPhone.trim()) && u.password === password
    );

    if (foundCustomer) {
      const customerUser = {
        name: foundCustomer.name,
        email: foundCustomer.email,
        phone: foundCustomer.phone,
        address: foundCustomer.address,
        role: 'customer'
      };
      setUser(customerUser);
      return { success: true, role: 'customer' };
    }

    // Fallback demo customer check for convenience
    if (inputClean === 'user@gmail.com' && password === 'User@123') {
      const demoUser = {
        name: 'Karthik Subramaniam',
        email: 'user@gmail.com',
        phone: '+91 98765 43210',
        address: 'Flat 402, Sunshine Apartments, RS Puram, Coimbatore',
        role: 'customer'
      };
      setUser(demoUser);
      return { success: true, role: 'customer' };
    }

    return { 
      success: false, 
      error: 'Invalid credentials! Please check your email/phone and password, or Sign Up for a new account.' 
    };
  };

  // Register Customer handler
  const registerUser = ({ name, email, phone, address, password }) => {
    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() || u.phone === phone.trim()
    );

    if (existing) {
      return { success: false, error: 'An account with this email or phone number already exists!' };
    }

    const newUser = { name, email, phone, address, password, role: 'customer' };
    setRegisteredUsers((prev) => [...prev, newUser]);
    
    // Auto-login registered user
    const customerUser = { name, email, phone, address, role: 'customer' };
    setUser(customerUser);
    return { success: true, role: 'customer' };
  };

  const logoutUser = () => {
    setUser(null);
    setIsAdminOpen(false);
    navigateTo('home');
  };

  const updateUserProfile = (updatedDetails) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...updatedDetails };
      if (prev.role === 'customer') {
        setRegisteredUsers((registeredList) =>
          registeredList.map((u) =>
            u.email.toLowerCase() === prev.email.toLowerCase() || u.phone === prev.phone
              ? { ...u, ...updatedDetails }
              : u
          )
        );
      }
      return updatedUser;
    });
  };

  // Dishes state persisted in LocalStorage (v9 ensures fresh dish name & photo sync)
  const [dishes, setDishes] = useState(() => {
    const saved = localStorage.getItem('cloudkitchen_dishes_v9');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10 && parsed[7]?.name === 'Pongal + Vada') {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Clear legacy keys if present
    localStorage.removeItem('cloudkitchen_dishes');
    localStorage.removeItem('cloudkitchen_dishes_v2');
    localStorage.removeItem('cloudkitchen_dishes_v3');
    localStorage.removeItem('cloudkitchen_dishes_v4');
    localStorage.removeItem('cloudkitchen_dishes_v5');
    localStorage.removeItem('cloudkitchen_dishes_v6');
    localStorage.removeItem('cloudkitchen_dishes_v7');
    localStorage.removeItem('cloudkitchen_dishes_v8');
    return INITIAL_DISHES;
  });

  useEffect(() => {
    localStorage.setItem('cloudkitchen_dishes_v9', JSON.stringify(dishes));
  }, [dishes]);

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cloudkitchen_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('cloudkitchen_orders_v4');
    return saved ? JSON.parse(saved) : [
      {
        id: 'CK-9821',
        customerName: 'Karthik Subramaniam',
        phone: '+91 98765 43210',
        address: 'Flat 402, Sunshine Apartments, RS Puram, Coimbatore',
        items: [{ name: 'Coimbatore Kongu Nattu Kozhi Kuzhambu & Parotta', quantity: 1, price: 249 }],
        totalAmount: 289,
        deliverySlot: '12:30 PM - 01:30 PM',
        status: 'Cooking',
        placedAt: new Date(Date.now() - 25 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        paymentMethod: 'Online Payment (Paid)'
      }
    ];
  });

  // UI Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTasteQuizOpen, setIsTasteQuizOpen] = useState(false);
  const [isTiffinBuilderOpen, setIsTiffinBuilderOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [selectedDishDetail, setSelectedDishDetail] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState('CK-9821');

  // Festive Theme & Offer Config Switch
  const [isFestiveMode, setIsFestiveMode] = useState(() => {
    const saved = localStorage.getItem('cloudkitchen_festive_mode');
    return saved ? JSON.parse(saved) : false;
  });

  const [festiveConfig, setFestiveConfig] = useState(() => {
    const saved = localStorage.getItem('cloudkitchen_festive_config');
    return saved ? JSON.parse(saved) : {
      title: '🌾 Kovai Festival Special Sale',
      message: 'Get extra 15% OFF on all Kovai Home Sappadu meal combos today!',
      discountPercent: 15,
    };
  });

  // Live Kitchen Status & Cut-off Timer
  const [kitchenStatus, setKitchenStatus] = useState(() => {
    const saved = localStorage.getItem('cloudkitchen_kitchen_status');
    return saved ? saved : 'Open';
  });

  const [liveStatusMessage, setLiveStatusMessage] = useState(() => {
    const saved = localStorage.getItem('cloudkitchen_live_message');
    return saved ? saved : '🔥 Live Cooking Active in RS Puram Home Kitchen Hub';
  });

  const [cutoffSeconds, setCutoffSeconds] = useState(9930);

  const resetCutoffTimer = (hours = 3) => {
    setCutoffSeconds(hours * 3600);
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCutoffSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen for Cross-Port Admin Sync Messages & Native Storage Events
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'CLOUDKITCHEN_ADMIN_SYNC' && event.data?.payload) {
        const { kitchenStatus, festiveMode, festiveConfig, dishes, orders, liveStatusMessage } = event.data.payload;
        if (kitchenStatus !== undefined) {
          setKitchenStatus(kitchenStatus);
          localStorage.setItem('cloudkitchen_kitchen_status', kitchenStatus);
        }
        if (festiveMode !== undefined) {
          setIsFestiveMode(festiveMode);
          localStorage.setItem('cloudkitchen_festive_mode', JSON.stringify(festiveMode));
        }
        if (festiveConfig !== undefined) {
          setFestiveConfig(festiveConfig);
          localStorage.setItem('cloudkitchen_festive_config', JSON.stringify(festiveConfig));
        }
        if (dishes !== undefined) {
          setDishes(dishes);
          localStorage.setItem('cloudkitchen_dishes_v9', JSON.stringify(dishes));
        }
        if (orders !== undefined) {
          setOrders(orders);
          localStorage.setItem('cloudkitchen_orders_v4', JSON.stringify(orders));
        }
        if (liveStatusMessage !== undefined) {
          setLiveStatusMessage(liveStatusMessage);
          localStorage.setItem('cloudkitchen_live_message', liveStatusMessage);
        }
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === 'cloudkitchen_kitchen_status' && e.newValue) {
        setKitchenStatus(e.newValue);
      }
      if (e.key === 'cloudkitchen_festive_mode' && e.newValue) {
        try { setIsFestiveMode(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === 'cloudkitchen_festive_config' && e.newValue) {
        try { setFestiveConfig(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === 'cloudkitchen_dishes_v9' && e.newValue) {
        try { setDishes(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === 'cloudkitchen_orders_v4' && e.newValue) {
        try { setOrders(JSON.parse(e.newValue)); } catch (err) {}
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Save state to localstorage
  useEffect(() => {
    localStorage.setItem('cloudkitchen_festive_mode', JSON.stringify(isFestiveMode));
  }, [isFestiveMode]);

  useEffect(() => {
    localStorage.setItem('cloudkitchen_festive_config', JSON.stringify(festiveConfig));
  }, [festiveConfig]);

  useEffect(() => {
    localStorage.setItem('cloudkitchen_kitchen_status', kitchenStatus);
  }, [kitchenStatus]);

  useEffect(() => {
    localStorage.setItem('cloudkitchen_live_message', liveStatusMessage);
  }, [liveStatusMessage]);

  useEffect(() => {
    localStorage.setItem('cloudkitchen_dishes_v9', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('cloudkitchen_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cloudkitchen_orders_v4', JSON.stringify(orders));
  }, [orders]);

  // Cart operations
  const addToCart = (dish, quantity = 1, customName = null, customPrice = null, selectedSpiceLevel = null) => {
    if (kitchenStatus?.toLowerCase() === 'closed') {
      alert('🚫 Kitchen is currently CLOSED! We are not accepting orders at this time.');
      return false;
    }

    const chosenSpice = selectedSpiceLevel || dish.spiceLevel || 2;
    const dishId = customName 
      ? `${dish.id}-${customName}-spice${chosenSpice}` 
      : `${dish.id}-spice${chosenSpice}`;
    const finalPrice = customPrice !== null ? customPrice : dish.price;
    const finalName = customName || dish.name;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === dishId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId: dishId,
            dishId: dish.id,
            name: finalName,
            price: finalPrice,
            image: dish.image,
            type: dish.type,
            quantity: quantity,
            spiceLevel: chosenSpice,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const updateCartSpiceLevel = (cartItemId, newSpiceLevel) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartItemId === cartItemId) {
          const newCartItemId = `${item.dishId}-spice${newSpiceLevel}`;
          return {
            ...item,
            cartItemId: newCartItemId,
            spiceLevel: newSpiceLevel,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  // Place Order Action
  const placeOrder = (orderDetails) => {
    if (kitchenStatus?.toLowerCase() === 'closed') {
      alert('🚫 Kitchen is currently CLOSED! Orders cannot be placed at this time.');
      return false;
    }

    const newOrderId = `CK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      customerName: orderDetails.name,
      phone: orderDetails.phone,
      address: orderDetails.address,
      items: [...cart],
      totalAmount: orderDetails.totalAmount,
      deliverySlot: orderDetails.deliverySlot,
      status: 'Received',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethod: orderDetails.paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    setTrackingOrderId(newOrderId);
    setIsCartOpen(false);
    setIsOrderTrackerOpen(true);
  };

  // Admin dish actions
  const toggleSoldOut = (dishId) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, isSoldOut: !d.isSoldOut } : d))
    );
  };

  const addOrUpdateDish = (newDish) => {
    setDishes((prev) => {
      const exists = prev.some((d) => d.id === newDish.id);
      if (exists) {
        return prev.map((d) => (d.id === newDish.id ? newDish : d));
      } else {
        return [newDish, ...prev];
      }
    });
  };

  const deleteDish = (dishId) => {
    setDishes((prev) => prev.filter((d) => d.id !== dishId));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigateTo,
        user,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        dishes,
        cart,
        orders,
        isCartOpen,
        setIsCartOpen,
        isAdminOpen,
        setIsAdminOpen,
        isTasteQuizOpen,
        setIsTasteQuizOpen,
        isTiffinBuilderOpen,
        setIsTiffinBuilderOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        selectedDishDetail,
        setSelectedDishDetail,
        trackingOrderId,
        setTrackingOrderId,
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
        addToCart,
        updateCartQty,
        updateCartSpiceLevel,
        removeFromCart,
        clearCart,
        placeOrder,
        toggleSoldOut,
        addOrUpdateDish,
        deleteDish,
        updateOrderStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
