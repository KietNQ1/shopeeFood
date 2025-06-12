
import React, { useState } from 'react';
import MainScreen from '../components/MainScreen';
import RestaurantMenu from '../components/RestaurantMenu';
import CartScreen from '../components/CartScreen';
import CheckoutScreen from '../components/CheckoutScreen';
import PaymentScreen from '../components/PaymentScreen';

export type Screen = 'main' | 'menu' | 'cart' | 'checkout' | 'payment';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantName: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartItem = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRestaurantSelect = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setCurrentScreen('menu');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'main':
        return (
          <MainScreen
            onRestaurantSelect={handleRestaurantSelect}
            onNavigate={setCurrentScreen}
            cartItemsCount={getTotalItems()}
          />
        );
      case 'menu':
        return (
          <RestaurantMenu
            restaurant={selectedRestaurant}
            onAddToCart={addToCart}
            onNavigate={setCurrentScreen}
            cartItemsCount={getTotalItems()}
          />
        );
      case 'cart':
        return (
          <CartScreen
            cartItems={cartItems}
            onUpdateItem={updateCartItem}
            onNavigate={setCurrentScreen}
            totalPrice={getTotalPrice()}
          />
        );
      case 'checkout':
        return (
          <CheckoutScreen
            cartItems={cartItems}
            totalPrice={getTotalPrice()}
            onNavigate={setCurrentScreen}
          />
        );
      case 'payment':
        return (
          <PaymentScreen
            totalPrice={getTotalPrice()}
            onNavigate={setCurrentScreen}
            onOrderComplete={clearCart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
    </div>
  );
};

export default Index;
