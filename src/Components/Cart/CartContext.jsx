// Enhanced CartContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '');
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(null);

  // Enhanced email formatting for API
  const formatEmailForApi = (email) => {
    return email?.replace(/[@.]/g, '_').toLowerCase() || '';
  };

  // Sync with localStorage
  const syncLocalStorage = (items) => {
    if (userEmail) {
      localStorage.setItem(`cart_${formatEmailForApi(userEmail)}`, JSON.stringify(items));
    }
  };

  // Load cart from localStorage for logged-in users
  const loadLocalCart = useCallback(() => {
    if (userEmail) {
      const localCart = localStorage.getItem(`cart_${formatEmailForApi(userEmail)}`);
      if (localCart) {
        try {
          return JSON.parse(localCart);
        } catch (error) {
          console.error('Error parsing local cart:', error);
        }
      }
    }
    return [];
  }, [userEmail]);

  // Fetch cart data from API
  const fetchCartData = useCallback(async () => {
    if (!userEmail) return;
    
    setLoading(true);
    const formattedEmail = formatEmailForApi(userEmail);
    
    try {
      const response = await fetch(
        `https://crudcrud.com/api/31490d1336a14ffe97fd66244454c803/cart_${formattedEmail}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          // Use the most recent cart entry
          const latestCart = data[data.length - 1];
          setCartItems(latestCart.items || []);
          setCartId(latestCart._id);
        } else {
          // No cart found, load from localStorage
          const localItems = loadLocalCart();
          setCartItems(localItems);
        }
      } else if (response.status === 404) {
        // Cart doesn't exist yet, load from localStorage
        const localItems = loadLocalCart();
        setCartItems(localItems);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      // Fallback to localStorage
      const localItems = loadLocalCart();
      setCartItems(localItems);
    } finally {
      setLoading(false);
    }
  }, [userEmail, loadLocalCart]);

  // Create new cart on API
  const createCartData = useCallback(async (items) => {
    if (!userEmail) return;
    
    const formattedEmail = formatEmailForApi(userEmail);
    const cartData = {
      userEmail: formattedEmail,
      items: items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `https://crudcrud.com/api/31490d1336a14ffe97fd66244454c803/cart_${formattedEmail}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setCartId(result._id);
      }
    } catch (error) {
      console.error('Error creating cart data:', error);
    }
  }, [userEmail]);

  // Update cart data on API
  const updateCartData = useCallback(async (items) => {
    if (!userEmail) return;
    
    const formattedEmail = formatEmailForApi(userEmail);
    const cartData = {
      userEmail: formattedEmail,
      items: items,
      updatedAt: new Date().toISOString(),
    };

    try {
      if (cartId) {
        // Update existing cart
        await fetch(
          `https://crudcrud.com/api/31490d1336a14ffe97fd66244454c803/cart_${formattedEmail}/${cartId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData),
          }
        );
      } else {
        // Create new cart
        await createCartData(items);
      }
    } catch (error) {
      console.error('Error updating cart data:', error);
      syncLocalStorage(items);
    }
  }, [userEmail, cartId, createCartData]);


  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const itemId = product.id || product.title;
      const existing = prevItems.find(item => (item.id || item.title) === itemId);
      let updatedCart;
      
      if (existing) {
        updatedCart = prevItems.map(item =>
          (item.id || item.title) === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1, addedAt: new Date().toISOString() }];
      }
      
      if (userEmail) {
        updateCartData(updatedCart);
        syncLocalStorage(updatedCart);
      }
      
      return updatedCart;
    });
  }, [userEmail, updateCartData]);

  const removeFromCart = useCallback((itemIdentifier) => {
    setCartItems(prev => {
      const updatedCart = prev.filter(item => 
        (item.id || item.title) !== itemIdentifier
      );
      
      if (userEmail) {
        updateCartData(updatedCart);
        syncLocalStorage(updatedCart);
      }
      
      return updatedCart;
    });
  }, [userEmail, updateCartData]);


  const updateQuantity = useCallback((itemIdentifier, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemIdentifier);
      return;
    }

    setCartItems(prev => {
      const updatedCart = prev.map(item =>
        (item.id || item.title) === itemIdentifier
          ? { ...item, quantity: newQuantity }
          : item
      );
      
      if (userEmail) {
        updateCartData(updatedCart);
        syncLocalStorage(updatedCart);
      }
      
      return updatedCart;
    });
  }, [userEmail, updateCartData, removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    if (userEmail) {
      updateCartData([]);
      syncLocalStorage([]);
    }
  }, [userEmail, updateCartData]);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const login = async (newToken, email) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userEmail', email);
    setToken(newToken);
    setUserEmail(email);
    
    await fetchCartData();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setToken('');
    setUserEmail('');
    setCartItems([]);
    setCartId(null);
  };

  useEffect(() => {
    if (userEmail) {
      fetchCartData();
    } else {
      // For guest users, load from generic localStorage
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        try {
          setCartItems(JSON.parse(guestCart));
        } catch (error) {
          console.error('Error parsing guest cart:', error);
        }
      }
    }
  }, [userEmail, fetchCartData]);

  // Sync guest cart to localStorage
  useEffect(() => {
    if (!userEmail && cartItems.length > 0) {
      localStorage.setItem('guestCart', JSON.stringify(cartItems));
    }
  }, [cartItems, userEmail]);

  // Auto-save cart periodically (reduced frequency to avoid API limits)
  useEffect(() => {
    if (!userEmail || cartItems.length === 0) return;

    const autoSaveInterval = setInterval(() => {
      updateCartData(cartItems);
    }, 60000); // Auto-save every 60 seconds

    return () => clearInterval(autoSaveInterval);
  }, [cartItems, userEmail, updateCartData]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalQuantity,
        totalPrice,
        token,
        userEmail,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};